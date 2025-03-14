import React, { useState, useEffect } from 'react';
import { ArrowLeft, HeartCrack,Pill, Hospital } from 'lucide-react';

const ErrorPage = () => {
  const [text, setText] = useState("");
  const fullText = "This page took a wrong pill and disappeared!";
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  
  useEffect(() => {
    setText(""); 
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setText(prev => fullText.substring(0, i + 1)); 
        i++;
      } else {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
      }
    }, 50);
    
    return () => clearInterval(typingInterval);
  }, [fullText]); 

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg overflow-hidden">
        
        <div className="bg-blue-900 p-6 flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-white mb-3">
            4<HeartCrack className="inline mx-1 text-red-500" size={32} />4
          </h1>
          <p className="text-xl font-semibold text-white">
            "Looks like this page had a heart attack and didn't survive!"
          </p>
        </div>
        
        <div className="p-8">
          <div className="mb-8 bg-gray-50 p-5 rounded-lg shadow-sm border border-gray-100 w-full">
            <p className="text-lg font-medium text-gray-800 mb-1">
              {text}
              {!isTypingComplete && <span className="animate-pulse">|</span>}
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center">
            
            <div className="w-full md:w-1/3 flex justify-center mb-6 md:mb-0">
              <div className="relative w-40 h-40 flex justify-center items-center">
                <div className="absolute animate-pulse">
                </div>
                <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center">
                  <Hospital className="text-blue-600" size={48} />
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-2/3 text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Page Not Found
              </h2>
              
              <p className="text-gray-600 mb-6">
                We've prescribed a navigation remedy to help you find your way back to health!
              </p>
              
              <div className="space-y-4">
                <button
                  onClick={handleGoBack}
                  className="flex items-center justify-center space-x-2 w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-md font-medium transition duration-200"
                >
                  <ArrowLeft size={18} />
                  <span>Go Back to Safety</span>
                </button>
                
              </div>
            </div>
          </div>
        </div>
        

        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-500">
              © 2025 ENVISION MRI
            </p>
            <div className="space-x-4">
              <a href="/emergency" className="text-xs text-red-500 hover:underline">
                Emergency Contact
              </a>
              <a href="/help" className="text-xs text-blue-500 hover:underline">
                Patient Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;