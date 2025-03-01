import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ReportAnalyzer() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileSelect = async (file) => {
    setSelectedFile(file);
    setMessages(prev => [...prev, {
      type: 'user',
      content: `Uploaded: ${file.name}`,
      timestamp: new Date().toLocaleTimeString()
    }]);

    // Simulate processing message
    setIsLoading(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: 'assistant',
        content: `I've received the file ${file.name}. What would you like to know about it?`,
        timestamp: new Date().toLocaleTimeString()
      }]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      type: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: 'assistant',
        content: 'I understand your question. Let me analyze that for you...',
        timestamp: new Date().toLocaleTimeString()
      }]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex h-screen pt-16 bg-white">
      {/* Sidebar */}
      <motion.div 
        initial={{ x: -250 }}
        animate={{ x: isSidebarOpen ? 0 : -250 }}
        className="w-64 bg-gray-50 border-r border-gray-200 p-4 flex flex-col"
      >
        <h2 className="text-lg font-semibold mb-4">Recent Files</h2>
        <button 
          onClick={() => fileInputRef.current.click()} 
          className="w-full px-4 py-2 mb-4 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
        >
          Upload New File
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => handleFileSelect(e.target.files[0])}
          className="hidden"
          accept=".pdf,.doc,.docx,.txt,.jpg,.png"
        />
        <div className="flex-1 overflow-y-auto space-y-2">
          {messages
            .filter(m => m.type === 'user' && m.content.startsWith('Uploaded:'))
            .map((message, index) => (
              <div key={index} className="p-2 hover:bg-gray-100 rounded cursor-pointer flex items-center space-x-2">
                <svg className="w-4 h-4 text-gray-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <span className="text-sm truncate">
                  {message.content.replace('Uploaded: ', '')}
                </span>
              </div>
            ))}
        </div>
      </motion.div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-2xl p-4 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-blue-100 text-gray-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div className="text-sm">{message.content}</div>
                <div className="text-xs text-gray-500 mt-1">{message.timestamp}</div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
          <div className="flex space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question about your report..."
              className="flex-1 p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className={`px-6 py-2 text-white rounded-lg transition-colors ${
                isLoading || !input.trim() 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              Send
            </button>
          </div>
        </form>
      </div>

      {/* Sidebar Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-r hover:bg-gray-300 focus:outline-none"
      >
        {isSidebarOpen ? '◀' : '▶'}
      </button>
    </div>
  );
}