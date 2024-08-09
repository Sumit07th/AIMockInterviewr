"use client"

import React from 'react'
import Header from '../dashboard/_components/Header'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

function QuestionPage() {
  const router = useRouter();

  const handleExploreMore = () => {
    router.push('/dashboard');
  }

  return (
    <div className='bg-gray-100 min-h-screen'>
      <Header />
      <main className='p-10'>
        <div className='max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8'>
          <h2 className='text-4xl font-bold text-gray-800 mb-6'>Interview Questions</h2>
          <p className='text-lg text-gray-600 mb-8'>
            Welcome to the questions section! Here you'll find a curated list of common and challenging interview questions to help you prepare effectively.
          </p>
          
          <div className='mb-8'>
            <h3 className='text-2xl font-semibold text-gray-700 mb-4'>Popular Questions</h3>
            <ul className='list-disc pl-5 space-y-3'>
              <li className='text-gray-800'>Tell me about yourself.</li>
              <li className='text-gray-800'>Why do you want to work here?</li>
              <li className='text-gray-800'>What are your strengths and weaknesses?</li>
              <li className='text-gray-800'>Describe a challenging project you've worked on.</li>
              <li className='text-gray-800'>Where do you see yourself in 5 years?</li>
            </ul>
          </div>

          <div className='flex justify-center'>
            <Button
              variant="primary"
              className='px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 transition duration-300'
              onClick={handleExploreMore}
            >
              Explore More Questions
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default QuestionPage
