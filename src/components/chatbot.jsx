import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import chatbotIcon from "../assets/chatbot.png";
import sendIcon from "../assets/send.png";
import axios from "axios";


export default function ChatBot({ isOpen, toggleChat }) {
  const [userInput, setUserInput] = useState("");
  const [botResponse, setBotResponse] = useState("Hi! How can I help you today?");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (userInput.trim() === "" || isLoading) return;
  
    setIsLoading(true);
    const userMessage = userInput;
    
    // Add user message to chat history
    setChatHistory(prev => [...prev, { type: 'user', message: userMessage }]);
    setUserInput("");
    setBotResponse("..."); 
  
    try {
      const response = await axios.post("http://localhost:3000/chat/", {
        query: userMessage
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      const botMessage = JSON.stringify(response.data.message.response);

      console.log(botMessage)
      setBotResponse(botMessage);
      setChatHistory(prev => [...prev, { type: 'bot', message: botMessage }]);
      
    } catch (error) {
      console.error("Error fetching response:", error);
      setBotResponse("Sorry, I'm having trouble connecting. Please try again later.");
      setChatHistory(prev => [...prev, { 
        type: 'bot', 
        message: "Sorry, I'm having trouble connecting. Please try again later." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.button
        onClick={toggleChat}
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white rounded-lg shadow-xl overflow-hidden"
          >
            <div className="bg-blue-700 text-white p-4 flex items-center">
              <div className="mr-3 bg-white rounded-full p-1.5">
               
                <img src={chatbotIcon} alt="Chatbot" className="w-8 h-8" />
              </div>
              <h3 className="font-bold">ENVISION Assistant</h3>
            </div>
            <div id="chat-messages" className="h-80 overflow-y-auto p-4 bg-gray-50">
              <div className="mb-4 text-left">
                <div className="inline-block max-w-xs sm:max-w-sm px-4 py-2 rounded-lg bg-gray-200 text-gray-800 rounded-bl-none">
                  {botResponse}
                </div>
              </div>
              {isLoading && (
                <div className="flex justify-start mb-4">
                  <div className="bg-gray-200 px-4 py-2 rounded-lg rounded-bl-none flex items-center">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-3 bg-white">
              <div className="flex items-center">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                />
                <button 
                  type="submit" 
                  className="ml-3 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-all disabled:bg-blue-400"
                  disabled={!userInput.trim() || isLoading}
                >
                <img src={sendIcon} alt="Send" className="w-6 h-6"/>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}