import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { motion, AnimatePresence } from "framer-motion";
import mri from "../assets/MRI.jpg";
import patient_doctor from "../assets/patient-doctor.jpg";
import surgical_procedure from "../assets/surgical-procedure.jpg";
import ChatBot from "../components/chatbot";

export default function HomePage() {
  const carouselContent = [
    {
      heading: "Advanced MRI Analysis",
      text: "Cutting-edge AI-powered insights for medical professionals.",
      image: mri,
      buttonText: "Explore Technology"
    },
    {
      heading: "Patient-Centered Care",
      text: "Making complex imaging accessible and understandable.",
      image: patient_doctor,
      buttonText: "Learn About Our Approach"
    },
    {
      heading: "Precision Diagnostics",
      text: "Visualize details with unprecedented clarity and accuracy.",
      image: surgical_procedure,
      buttonText: "See Case Studies"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselContent.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselContent.length) % carouselContent.length);
  };

  // Toggle chat window
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  // Parallax scroll effect
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      
      <main 
        className="flex flex-col items-center justify-center h-screen text-center px-4 relative overflow-hidden"
        style={{
          backgroundImage: `url(${mri})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-white/30 backdrop-blur-sm z-0"></div>

        <div className="relative z-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-blue-900 tracking-tight mb-4">
              ENVISION-MRI
            </h1>
            <h2 className="text-2xl md:text-4xl font-medium text-blue-900/70 mb-8">
              See beyond the image - unlock the insight.
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <motion.button 
                className="px-8 py-3 bg-transparent border-2 border-blue-900 text-blue-900 font-medium rounded-lg hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Watch Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </main>
      
      {/* Enhanced Carousel Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            <span className="inline-block pb-2 border-b-4 border-blue-500">Our Solutions</span>
          </h2>
  
          <div className="flex flex-col md:flex-row items-center relative overflow-hidden rounded-2xl shadow-2xl">
            <div className="w-full md:w-1/2 p-8 md:p-12">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentSlide + "-text"}
                  className="max-w-xl"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <h2 className="text-4xl font-bold text-gray-800">{carouselContent[currentSlide].heading}</h2>
                  <p className="text-xl text-gray-700 mt-4">
                    {carouselContent[currentSlide].text}
                  </p>
                  <div className="mt-8 flex gap-2 justify-center">
                    {carouselContent.map((_, index) => (
                      <button 
                        key={index}
                        className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'}`}
                        onClick={() => setCurrentSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
         
        
            <div className="w-full md:w-1/2 h-64 md:h-96 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide + "-image-container"}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.img 
                  src={carouselContent[currentSlide].image}
                  alt={carouselContent[currentSlide].heading}
                  className="object-cover w-full h-full"
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
              </motion.div>
            </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
      
      {/* Understanding MRI Section with Cards */}
      <section className="py-16 px-4 bg-gradient-to-br from-gray-100 to-blue-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
            Understanding MRI
          </h2>
          <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-12">
            Magnetic Resonance Imaging (MRI) is a medical imaging technique used to visualize detailed internal structures of the body. It provides high-resolution images that help in diagnosing various conditions with precision.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {[
              {
                title: "How It Works",
                description: "MRI uses powerful magnets and radio waves to create detailed images of organs and tissues within the body.",
                icon: (
                  <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                )
              },
              {
                title: "Advanced Analysis",
                description: "Our AI-powered platform processes MRI scans to identify patterns and anomalies that might be missed by the human eye.",
                icon: (
                  <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                )
              },
              {
                title: "Clinical Benefits",
                description: "ENVISION-MRI enhances diagnostic accuracy, reduces interpretation time, and improves patient outcomes.",
                icon: (
                  <svg className="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                )
              }
            ].map((card, idx) => (
              <motion.div 
                key={idx}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0, delay: idx * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -10 }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-6">
                    {card.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{card.title}</h3>
                  <p className="text-gray-600">{card.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Chatbot Integration */}
      <div className="fixed bottom-6 right-6 z-50">
        <ChatBot isOpen={isChatOpen} toggleChat={toggleChat} />
      </div>      
    </div>    
  );
}