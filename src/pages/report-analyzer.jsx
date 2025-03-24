import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ReportAnalyzer() {
  // State Management
  const [messages, setMessages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const patients = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Robert Johnson' },
    { id: '4', name: 'Emily Williams' },
    { id: '5', name: 'Michael Brown' }
  ];

  // Filter patients based on search query
  useEffect(() => {
    const filtered = patients.filter(patient => 
      patient.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPatients(filtered);
  }, [searchQuery]);

  // Initialize filtered patients on component mount
  useEffect(() => {
    setFilteredPatients(patients);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // File Handling
  const handleFileSelect = async (e) => {
    if (!selectedPatient) {
      alert('Please select a patient first');
      return;
    }
    
    const file = e.target.files[0];
    if (!file) return;
    
    setSelectedFile(file);
    const patientName = patients.find(p => p.id === selectedPatient)?.name || 'Unknown patient';
    
    setMessages(prev => [...prev, {
      type: 'user',
      content: `Uploaded: ${file.name} for patient: ${patientName}`,
      timestamp: new Date().toLocaleTimeString()
    }]);

    // Set processing state (you'll replace this with your model)
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setMessages(prev => [...prev, {
        type: 'assistant',
        content: `File ${file.name} uploaded successfully for ${patientName}. Ready for analysis.`,
        timestamp: new Date().toLocaleTimeString()
      }]);
    }, 1500);
  };

  const handleUploadClick = () => {
    if (!selectedPatient) {
      alert('Please select a patient first');
      return;
    }
    fileInputRef.current.click();
  };

  const handlePatientSelect = (patientId) => {
    setSelectedPatient(patientId);
    setSearchQuery(''); 
  };

  // Handle search input focus
  const handleSearchFocus = () => {
    if (!searchQuery) {
      setFilteredPatients(patients);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 mx-auto w-full max-w-4xl flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-8 text-blue-900">Analyze Report</h1>
        
        {/* Patient Search and Selection */}
        <div className="w-full mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Search Patient</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Type patient name..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={handleSearchFocus}
            />
            {searchQuery && (
              <button
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                onClick={() => setSearchQuery('')}
              >
                ✕
              </button>
            )}
          </div>
          
          {/* Patient List */}
          {(searchQuery || document.activeElement === document.getElementById('patient-search')) && filteredPatients.length > 0 && (
            <div className="mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {filteredPatients.map(patient => (
                <div
                  key={patient.id}
                  className={`p-3 cursor-pointer hover:bg-gray-100 ${
                    selectedPatient === patient.id ? 'bg-blue-100' : ''
                  }`}
                  onClick={() => handlePatientSelect(patient.id)}
                >
                  {patient.name}
                </div>
              ))}
            </div>
          )}
          
          {/* No Results */}
          {searchQuery && filteredPatients.length === 0 && (
            <div className="mt-2 p-3 bg-gray-50 border border-gray-300 rounded-lg text-center">
              <p className="text-gray-500">No patients found</p>
            </div>
          )}
          
          {/* Selected Patient Display */}
          {selectedPatient && (
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg flex justify-between items-center">
              <span>
                Selected Patient: <strong>{patients.find(p => p.id === selectedPatient)?.name}</strong>
              </span>
              <button 
                className="text-sm text-blue-600 hover:text-blue-800"
                onClick={() => setSelectedPatient('')}
              >
                Change
              </button>
            </div>
          )}
        </div>
        
        {/* Report Upload Box */}
        <div className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col items-center justify-center py-8">
              <input 
                type="file" 
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileSelect}
                accept=".jpg,.png"
              />
              
              <div 
                className={`w-full max-w-lg border-2 border-dashed ${selectedPatient ? 'border-blue-300 cursor-pointer hover:bg-blue-50' : 'border-gray-300 bg-gray-100'} rounded-lg p-6 text-center transition-colors duration-200`}
                onClick={selectedPatient ? handleUploadClick : () => alert('Please select a patient first')}
              >
                <div className="mb-4">
                  <svg className={`w-12 h-12 mx-auto ${selectedPatient ? 'text-blue-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                </div>
                <h3 className={`text-lg font-medium ${selectedPatient ? 'text-blue-900' : 'text-gray-500'} mb-1`}>
                  {selectedFile ? selectedFile.name : 'Upload Medical Report'}
                </h3>
                <p className="text-sm text-gray-500">
                  {!selectedPatient 
                    ? 'Please select a patient before uploading'
                    : selectedFile 
                      ? `${(selectedFile.size / 1024).toFixed(2)} KB • Click to change file` 
                      : 'Drag & drop files or click to browse (.jpg, .png)'}
                </p>
              </div>
              
              {selectedFile && selectedPatient && (
                <div className="mt-4 flex items-center">
                  {isProcessing ? (
                    <div className="flex items-center px-6 py-2 bg-gray-100 text-gray-700 rounded-lg">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span className="flex items-center text-green-600">
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Upload Complete
                      </span>
                      <button 
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        onClick={() => {
                          // This is where you would trigger your analysis model
                          
                        }}
                      >
                        Analyze Report
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}