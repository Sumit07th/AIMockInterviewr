"use client"

import React from 'react'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Header from '../dashboard/_components/Header'

function Work() {
  const router = useRouter();

  const handleExploreMore = () => {
    router.push('/dashboard');
  }

  return (
    <div className='bg-gray-100 min-h-screen'>
      <Header/>
      <main className='p-10'>
        <div className='max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8'>
          <h2 className='text-4xl font-bold text-gray-800 mb-6'>How It Works</h2>
          <p className='text-lg text-gray-600 mb-8'>
            Our platform provides a comprehensive solution for interview preparation. Here's a step-by-step guide to help you get started:
          </p>
          
          <div className='space-y-8 mb-8'>
            <div className='flex items-center space-x-4'>
              <Image src='/step1.jpeg' width={60} height={60} alt='Step 1' />
              <div>
                <h3 className='text-2xl font-semibold text-gray-700'>1. Create an Interview</h3>
                <p className='text-gray-600'>Start by creating a new mock interview. Provide details such as job position, description, and years of experience.</p>
              </div>
            </div>
            <div className='flex items-center space-x-4'>
              <Image src='/step2.jpeg' width={60} height={60} alt='Step 2' />
              <div>
                <h3 className='text-2xl font-semibold text-gray-700'>2. Get Customized Questions</h3>
                <p className='text-gray-600'>Our AI will generate a set of customized interview questions based on your inputs.</p>
              </div>
            </div>
            <div className='flex items-center space-x-4'>
              <Image src='/step3.jpeg' width={60} height={60} alt='Step 3' />
              <div>
                <h3 className='text-2xl font-semibold text-gray-700'>3. Record Your Answers</h3>
                <p className='text-gray-600'>Record your answers to the questions. You can use our integrated webcam and speech-to-text features for convenience.</p>
              </div>
            </div>
            <div className='flex items-center space-x-4'>
              <Image src='/step4.jpeg' width={60} height={60} alt='Step 4' />
              <div>
                <h3 className='text-2xl font-semibold text-gray-700'>4. Receive Feedback</h3>
                <p className='text-gray-600'>After recording your answers, receive detailed feedback and ratings to help you improve.</p>
              </div>
            </div>
          </div>

          <div className='flex justify-center'>
            <Button
              variant="primary"
              className='px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 transition duration-300'
              onClick={handleExploreMore}
            >
              Explore More
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Work
