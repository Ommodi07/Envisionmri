import React, { useState,useEffect } from 'react';
import { Link } from "react-router-dom";
import logo from "../assets/ENVISION-MRI.svg";
import { use } from 'react';

const Navbar = () => {
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    useEffect(() => {
      
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
    }, []);

  return (
      <nav className="container mx-auto py-2  bg-white/60 flex justify-between items-center text-blue-800  font-medium  px-8 z-50 sticky top-0 backdrop-blur-sm shadow-md ">
      <Link to ="/"><img src={logo} alt="logo" className="h-12" /></Link>
      <div className="space-x-5 ">
        
        <Link to="/report-analyzer" className="hover:text-blue-500">Report Analyzer</Link>
        <Link to="/manage-patient" className="hover:text-blue-500">Manage Patient</Link>
        {isAuthenticated ? (
          <Link to="/profile" className="hover:text-blue-500">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-7 w-7 inline-block"
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" 
                clipRule="evenodd" 
              />
            </svg>
          </Link>
        ) : (
          <>
            <Link to="/signin" className="hover:text-blue-500">Sign in</Link>
            <Link to="/signup" className="hover:text-blue-500">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;  