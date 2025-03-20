import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ChatBot from '@/components/chatbot';

export default function ReportAnalyzer() {
  // State Management
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState('');

  // Refs
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Mock Data
  const patients = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Robert Johnson' },
    { id: '4', name: 'Emily Williams' },
    { id: '5', name: 'Michael Brown' }
  ];

  // Utility Functions
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Event Handlers
  const handleFileSelect = async (file) => {
    if (!selectedPatient) {
      alert('Please select a patient first');
      return;
    }
    
    setSelectedFile(file);
    const patientName = patients.find(p => p.id === selectedPatient)?.name || 'Unknown patient';
    
    setMessages(prev => [...prev, {
      type: 'user',
      content: `Uploaded: ${file.name} for patient: ${patientName}`,
      timestamp: new Date().toLocaleTimeString()
    }]);

    setIsLoading(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: 'assistant',
        content: `I've received the file ${file.name} for ${patientName}. What would you like to know about it?`,
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

    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: 'assistant',
        content: 'I understand your question. Let me analyze that for you...',
        timestamp: new Date().toLocaleTimeString()
      }]);
      setIsLoading(false);
    }, 1000);
  };

  const handleUploadClick = () => {
    if (!selectedPatient) {
      alert('Please select a patient first');
      return;
    }
    fileInputRef.current.click();
  };

  return (
    <div className="flex h-screen bg-blue-100">
      {/* Left Sidebar */}
      <motion.div 
        initial={{ x: -300 }}
        animate={{ x: isSidebarOpen ? 0 : -300 }}
        className="w-72 bg-gray-50 border-r border-gray-200 p-4 flex flex-col"
      >
        <h2 className="text-lg font-semibold mb-4">Patient Records</h2>

        {/* Patient Selection */}
        <div className="mb-4">
          <label htmlFor="patient-select" className="block text-sm font-medium text-gray-700 mb-1">
            Select Patient
          </label>
          <select
            id="patient-select"
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">-- Select a patient --</option>
            {patients.map(patient => (
              <option key={patient.id} value={patient.id}>{patient.name}</option>
            ))}
          </select>
        </div>

        {/* Upload Button */}
        <button 
          onClick={handleUploadClick} 
          className={`w-full px-4 py-2 mb-4 text-sm text-white rounded transition-colors ${
            selectedPatient ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
          }`}
          disabled={!selectedPatient}
        >
          Upload File
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => handleFileSelect(e.target.files[0])}
          className="hidden"
          accept=".pdf,.doc,.docx,.txt,.jpg,.png"
        />

        {/* Recent Uploads List */}
        <h3 className="text-md font-medium mb-2 text-gray-700">Recent Uploads</h3>
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

      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-r hover:bg-gray-300 focus:outline-none"
      >
        {isSidebarOpen ? '◀' : '▶'}
      </button>

      {/* Main Content Area - Add your chat interface here */}
      <div className="flex-1 p-4">
        {/* Add chat interface component */}
      </div>
    </div>
  );
}