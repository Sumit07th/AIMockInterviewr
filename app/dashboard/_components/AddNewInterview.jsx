"use client";
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/utils/GeminiAIModal';
import { LoaderCircle } from 'lucide-react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/navigation';

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [jobExpe, setJobExpe] = useState('');
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState(null);
  const router = useRouter();
  const { user } = useUser();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const InputPrompt = `Job Position: ${jobPosition}, Job description: ${jobDesc}, years of experience: ${jobExpe}. Based on this information, please give me ${process.env.NEXT_PUBLIC_INTERVIE_QUESTION_COUNT} interview questions with answers in JSON format. Give the question and answer as fill in JSON.`;

    try {
      const result = await chatSession.sendMessage(InputPrompt);
      const rawResponse = result.response.text();

      // Clean up response by removing formatting markers
      const cleanedResponse = rawResponse.replace(/```json|```/g, '').trim();

      try {
        const parsedResponse = JSON.parse(cleanedResponse);
        console.log(parsedResponse);
        setJsonResponse(parsedResponse);

        if (parsedResponse) {
          const resp = await db.insert(MockInterview)
            .values({
              mockId: uuidv4(),
              jsonMockResp: cleanedResponse,
              jobPosition: jobPosition,
              jobDesc: jobDesc,
              jobExperience: jobExpe,
              createdBy: user?.primaryEmailAddress?.emailAddress,
              createdAt: moment().format('DD-MM-yyyy'),
            })
            .returning({ mockId: MockInterview.mockId });

          console.log("Inserted ID:", resp);

          if (resp) {
            setOpenDialog(false);
            router.push('/dashboard/interview/' + resp[0]?.mockId);
          }
        } else {
          console.error("ERROR: No valid response from AI.");
        }
      } catch (error) {
        console.error('Failed to parse JSON:', error);
      }
    } catch (error) {
      console.error('Failed to get response from AI:', error);
    }

    setLoading(false);
  };

  return (
    <div>
      <div
        className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'
        onClick={() => setOpenDialog(true)}
      >
        <h2 className='text-lg text-center'>
          + Add New
        </h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className='max-w-2xl'>
          <DialogHeader>
            <DialogTitle className='text-2xl'>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>Add Details about your job position, job description, and years of experience</h2>
                  <div className='mt-7 my-3'>
                    <label>Job Role/Job Position</label>
                    <Input
                      placeholder="Ex- Full Stack Developer"
                      required
                      onChange={(event) => setJobPosition(event.target.value)}
                    />
                  </div>
                  <div className='mt-7 my-3'>
                    <label>Job Description / Tech Stack (In short)</label>
                    <Textarea
                      placeholder="Ex- React, Angular, Nodejs, Mysql"
                      required
                      onChange={(event) => setJobDesc(event.target.value)}
                    />
                  </div>
                  <div className='mt-7 my-3'>
                    <label>Years of Experience</label>
                    <Input
                      placeholder="Ex- 5"
                      type="number"
                      max="50"
                      required
                      onChange={(event) => setJobExpe(event.target.value)}
                    />
                  </div>
                </div>
                <div className='flex gap-5 justify-end'>
                  <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? <>
                      <LoaderCircle className='animate-spin' /> Generating from AI
                    </> : 'Start Interview'}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
