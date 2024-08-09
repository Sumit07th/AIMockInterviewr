"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'

function Interview({ params }) {

    const [interviewData, setInterviewData] = useState(null); // Initialize with null
    const [webcamEnable, setWebcamEnable] = useState(false);

    useEffect(() => {
        console.log(params.interviewId)
        GetInterviewDetails();
    }, [])

    const GetInterviewDetails = async () => {
        try {
            const result = await db.select().from(MockInterview)
                .where(eq(MockInterview.mockId, params.interviewId))
            setInterviewData(result[0] || {}); // Set an empty object if result[0] is undefined
        } catch (error) {
            console.error("Failed to fetch interview details:", error);
        }
    }

    if (!interviewData) {
        // Optionally, show a loading state while data is being fetched
        return <div>Loading...</div>;
    }

    return (
        <div className="my-10">
            <h2 className="font-bold text-3xl mb-8 text-center">Let's Get Started</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl">

                {/* Left Side: Job Information and Information Sections */}
                <div className="flex flex-col space-y-10">

                    {/* Job Information Section */}
                    <div className="flex flex-col p-6 rounded-lg border border-gray-300 shadow-lg space-y-3 bg-white">
                        <h2 className="text-lg font-semibold">
                            <strong>Job Role/Position:</strong> {interviewData?.jobPosition || 'Not available'}
                        </h2>
                        <h2 className="text-lg font-semibold">
                            <strong>Job Description/Tech Stack:</strong> {interviewData?.jobDesc || 'Not available'}
                        </h2>
                        <h2 className="text-lg font-semibold">
                            <strong>Years of Experience:</strong> {interviewData?.jobExperience || 'Not available'}
                        </h2>
                    </div>

                    {/* Information Section */}
                    <div className="p-6 border rounded-lg border-yellow-300 bg-yellow-100 shadow-lg">
                        <h2 className="flex gap-2 items-center text-yellow-700 font-semibold text-lg">
                            <Lightbulb />
                            <span>Information</span>
                        </h2>
                        <p className="mt-4 text-yellow-800">{process.env.NEXT_PUBLIC_INFORMATION}</p>
                    </div>

                </div>

                {/* Right Side: Webcam Section */}
                <div className="flex flex-col items-center justify-center">
                    {webcamEnable ? (
                        <Webcam
                            onUserMedia={() => setWebcamEnable(true)}
                            onUserMediaError={() => setWebcamEnable(false)}
                            mirrored={true}
                            className="rounded-lg shadow-lg"
                            style={{
                                height: 300,
                                width: 300,
                            }}
                        />
                    ) : (
                        <div className="flex flex-col items-center space-y-5">
                            <WebcamIcon className="h-72 w-72 my-7 p-20 bg-secondary rounded-lg border shadow-md" />
                            <Button
                                variant="ghost"
                                className="w-full"
                                onClick={() => setWebcamEnable(true)}
                            >
                                Enable Webcam and Microphone
                            </Button>
                        </div>
                    )}
                </div>

            </div>
            <div className='flex justify-end items-end'>
                <Link href={'/dashboard/interview/'+params.interviewId+'/start'}>
                <Button>Start Interview</Button>
                </Link>
                </div>
        </div>
    );
}

export default Interview
