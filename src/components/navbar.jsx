import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/ENVISION-MRI.svg";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav className="w-full bg-inherit py-2 px-6 sticky top-0 shadow-md backdrop-blur-sm z-40">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <img src={logo} alt="logo" className="h-10 md:h-12 min-w-[100px] md:min-w-[120px]" />
            </Link>
          </div>

          {/* Links */}
          <div className="hidden md:flex space-x-6 text-blue-800 font-medium">
            <Link to="/report-analyzer" className="hover:text-blue-500">Report Analyzer</Link>
            <Link to="/manage-patient" className="hover:text-blue-500">Manage Patient</Link>
            {isAuthenticated ? (
              <Link to="/profile" className="hover:text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 inline-block" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
              </svg>
            </Link>
          ) : (
            <>
              <Link to="/signin" className="hover:text-blue-500">Sign in</Link>
              <Link to="/signup" className="hover:text-blue-500">Sign Up</Link>
            </>
          )}
          </div>
          
          {/* Mobile Menu Icon */}
          <div className="md:hidden text-3xl font-bold text-blue-800 cursor-pointer" onClick={() => setIsSidebarOpen(true)}>&#8801;</div>
        </div>
      </nav>

      {/* Sidebar Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-50 ${isSidebarOpen ? "block" : "hidden"}`} 
        onClick={() => setIsSidebarOpen(false)}
      />
      
      {/* Sidebar - Now from right side */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform ${isSidebarOpen ? "translate-x-0" : "translate-x-full"} z-50`}>
        <div className="p-3 flex justify-between items-center border-b border-gray-200">
          <img src={logo} alt="logo" className="h-10" />
          <button className="text-2xl font-bold text-gray-700" onClick={() => setIsSidebarOpen(false)}>&times;</button>
        </div>
        <div className="flex flex-col p-6 space-y-4 text-blue-800 font-medium">
          <Link to="/" className="hover:text-blue-500" onClick={() => setIsSidebarOpen(false)}>Home</Link>
          <Link to="/report-analyzer" className="hover:text-blue-500" onClick={() => setIsSidebarOpen(false)}>Report Analyzer</Link>
          <Link to="/manage-patient" className="hover:text-blue-500" onClick={() => setIsSidebarOpen(false)}>Manage Patient</Link>
          {isAuthenticated ? (
            <Link to="/profile" className="hover:text-blue-500" onClick={() => setIsSidebarOpen(false)}>Profile</Link>
          ) : (
            <>
              <Link to="/signin" className="hover:text-blue-500" onClick={() => setIsSidebarOpen(false)}>Sign in</Link>
              <Link to="/signup" className="hover:text-blue-500" onClick={() => setIsSidebarOpen(false)}>Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;