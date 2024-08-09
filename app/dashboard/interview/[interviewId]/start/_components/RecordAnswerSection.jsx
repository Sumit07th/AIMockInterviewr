"use client"

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import useSpeechToText from 'react-hook-speech-to-text';
import { Mic, StopCircle } from 'lucide-react'
import { toast } from 'sonner'
import { chatSession } from '@/utils/GeminiAIModal'
import { useUser } from '@clerk/nextjs'
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import moment from 'moment'

function RecordAnswerSection({mockInterviewQuestion,ActiveQuIndex,interviewData}) {
    const [userAnswer, setUserAnswer] = useState('');  // Initialize as an empty string
    const{user}=useUser();
    const [loading,setloading] = useState(false);
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    useEffect(() => {
        results.forEach((result) => {
            setUserAnswer((prevAns) => prevAns + (result?.transcript || '')); // Ensure undefined is handled
        });
    }, [results]);

    useEffect(()=>{
       if(!isRecording&&userAnswer.length>10)
       {
        UpdateUserAnswer();
       }
    },[userAnswer])

    const StartStopRecording=async()=>{
        if(isRecording){
            stopSpeechToText() 
        }
        else{
            startSpeechToText();
        }
        }


    const UpdateUserAnswer=async()=>{
        console.log(userAnswer);
        setloading(true);
        
        const feedbackPromt="Question"+mockInterviewQuestion[ActiveQuIndex]?.question+", User Answer:"+userAnswer+"Depends on question and user answer for given interview question"+
        "please give us rating for answer and feedback as area of improvment if any"+
        "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";
    
        const result=await chatSession.sendMessage(feedbackPromt);
    
        const mockJsonResp=(result.response.text()).replace('```json','').replace('```','');
        console.log(mockJsonResp);
        const JsonFeedbackResp=JSON.parse(mockJsonResp);
    
        const resp=await db.insert(UserAnswer)
        .values({
            mockIdRef:interviewData?.mockId,
            question:mockInterviewQuestion[ActiveQuIndex]?.question,
            correctAns:mockInterviewQuestion[ActiveQuIndex]?.answer,
            userAns:userAnswer,
            feedback:JsonFeedbackResp?.feedback,
            rating:JsonFeedbackResp?.rating,
            userEmail:user?.primaryEmailAddress?.emailAddress,
            createdAt:moment().format('DD-MM-yyyy')
        })
    
        if(resp){
            toast('User answer recorded Sucessfully');
            setUserAnswer('');
            setResults([]);
            
        }
        setResults([]);
        setloading(false);
    }

    return (
        <div className='flex items-center justify-center flex-col'>
            <div className='flex flex-col justify-center items-center bg-secondary rounded-lg p-5 bg-black mt-10'>
                <Image src={'/webcam.png'} width={200} height={200}
                    className='absolute' />
                <Webcam
                    mirrored={true}
                    style={{
                        height: 350,
                        width: '100%',
                        zIndex: 10,
                    }}
                />
            </div>

            <Button 
                disabled={loading}
                className='my-10'
                onClick={StartStopRecording}
            >
                {isRecording ?
                    <h2 className='text-red-600 animate-pulse flex gap-2 items-center'>
                        <StopCircle />  Stop Recording
                    </h2>
                    :
                    <h2 className='text-blue-600 animate-pulse flex gap-2 items-center'>
                        <Mic />  Record
                    </h2>}
            </Button>

           

        </div>
    )
}

export default RecordAnswerSection;
