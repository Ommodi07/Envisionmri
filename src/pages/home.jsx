import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { motion, AnimatePresence } from "framer-motion";
import mri from "../assets/MRI.jpg"
import patient_doctor from "../assets/patient-doctor.jpg"
import surgical_procedure from "../assets/surgical-procedure.jpg"

export default function HomePage() {
  const carouselContent = [
    {
      heading: "Advanced MRI Analysis",
      text: "Cutting-edge AI-powered insights for medical professionals.",
      image: mri
    },
    {
      heading: "Patient-Centered Care",
      text: "Making complex imaging accessible and understandable.",
      image: patient_doctor
    },
    {
      heading: "Precision Diagnostics",
      text: "Visualize details with unprecedented clarity and accuracy.",
      image: surgical_procedure
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselContent.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">

      
      <main className="flex flex-col items-center justify-center h-screen text-center px-10 relative">
        <motion.h1 
          className="text-7xl font-bold text-grey-900 absolute top-1/4"
          animate={{ 
            opacity: [1, 0.7, 1],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut"
          }}
        >
          ENVISION-MRI
          <h2 className="text-4xl font-bold text-gray-800">See beyond the image - unlock the insight.</h2>
        </motion.h1>
      </main>
      
      <section className="flex flex-col md:flex-row items-center justify-between h-screen bg-white">
        <div className="w-full md:w-1/2 p-10 flex items-center justify-center">
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
        
        <div className="w-full md:w-1/2 h-full relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img 
              key={currentSlide + "-image"}
              src={carouselContent[currentSlide].image}
              alt={carouselContent[currentSlide].heading}
              className="object-cover w-full h-full"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </AnimatePresence>
        </div>
      </section>
      
      <section className="flex flex-col items-center justify-center text-center p-10 bg-gray-200">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold text-gray-800">Understanding MRI</h2>
          <p className="text-lg text-gray-700 mt-4">
            Magnetic Resonance Imaging (MRI) is a medical imaging technique used to visualize detailed internal structures of the body. It provides high-resolution images that help in diagnosing various conditions with precision.
          </p>
        </div>
      </section>
     
    </div>    
  );
}