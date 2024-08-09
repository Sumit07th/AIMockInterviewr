import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'

function QuestionsSection({mockInterviewQuestion,ActiveQuIndex}) {
    const textToSpeach=(text)=>{
        if('speechSynthesis' in window){
            const speech=new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech)
        }
        else{
            alert('Sorry , Your browser does not support text to speech')
        }
    }
  return mockInterviewQuestion&&(
    <div className='p-5 boredr rounded-lg my-10'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg-grid-cols-4 gap-5'>
            {mockInterviewQuestion&&mockInterviewQuestion.map((question,index)=>(
                <h2 className={`p-2 bg-secondary rounded-full
                text-xsmd:text-sm text-center cursor-pointer
                ${ActiveQuIndex==index&&'bg-blue-700'}`}>Question #{index+1}</h2>
            ))}

            
        </div>
        <h2 className='my-5 text-md md:text-lg'>{mockInterviewQuestion[ActiveQuIndex]?.question}</h2>

        <Volume2 className='cursor-pointer' onClick={()=>textToSpeach(mockInterviewQuestion[ActiveQuIndex]?.question)}/>

        <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
            <h2 className='flex gap-5 items-center text-blue-700'>
                <Lightbulb/>
                <strong>Note:</strong>
            </h2>
            <h2 className='text-sm text-color-blue my-2'>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
        </div>
    </div>
  )
}

export default QuestionsSection