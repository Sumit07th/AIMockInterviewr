"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Header from "./dashboard/_components/Header";

export default function Home() {
  const router = useRouter();

  const handleStartInterview = () => {
    router.push('/dashboard');
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            Welcome to Your AI Mock Interview Platform
          </h1>z
          <p className="text-lg mb-6 text-gray-600">
            Prepare for your next interview with our advanced AI mock interview tool. Enhance your skills and build confidence with personalized feedback and practice questions.
          </p>
          <Image 
            src="/ai-interview-mock.jpeg" 
            alt="AI Mock Interview" 
            width={600} 
            height={400} 
            className="mx-auto mb-6 rounded-lg shadow-md"
          />
          <Button 
            onClick={handleStartInterview} 
            className="bg-blue-600 text-white hover:bg-blue-700 transition-all"
          >
            Start Interview Preparation
          </Button>
        </div>
      </main>
      <footer className="bg-secondary text-center p-4 text-white">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </footer>
    </div>
  );
}
