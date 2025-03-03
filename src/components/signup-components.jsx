import videoScource from "../assets/signup.mp4";
import logo from "../assets/ENVISION-MRI.svg"
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import {Signin} from "../pages/signin"
import { useState } from 'react';
import axios from 'axios';

export const LeftComponent = ()=>{
    return (
    <>
    <div className="w-[800px] h-[790px] bg-gradient-to-br from-blue-100 to-blue-400 flex flex-col rounded-xl my-1  overflow-hidden">
          <div className="flex flex-col px-[70px] py-[100px] w-[450] max-h-full gap-7">
            <div className="leading-10 text-3xl font-medium">
              <h1>Transforming MRI Reports into </h1>
              <h1 className="bg-gradient-to-b from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Actionable Insights
              </h1>
            </div>
            <div className=" w-[650px] text-md">
              <p className="font-thin">
                Get AI-powered insights from MRI scans and symptoms instantly.
                Upload medical images and receive accurate, data-driven analysis
                in minutes
              </p>
            </div>

            <div>
              {" "}
              <video
                src={videoScource}
                autoPlay
                loop
                muted
                className="w-full h-full rounded-xl outline-none object-cover  "
              ></video>
            </div>
          </div>
        </div>
    </>)
}





export const RightComponent = () => {
  const location = useLocation(); // Add this hook
  const isSignup = location.pathname === '/signup';
  const [formData, setFormData] = useState({
      ...(isSignup ? {
          firstname: '',
          lastname: '',
      } : {}),
      email: '',
      password: ''
  });
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
  
        setErrors({
            ...errors,
            [e.target.name]: ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError('');
        setIsLoading(true);

        try {
          const endpoint = isSignup ? '/user/signup' : '/user/signin';
          const response = await axios.post(`https://envisionmri.onrender.com${endpoint}`, formData);
          console.log(isSignup ? 'Signup successful:' : 'Signin successful:', response.data);
          
          if (response.data.token) {
              // Store token for signin
              console.log(response.data.token);
              localStorage.setItem('token', response.data.token);
              
          }
          
          navigate(isSignup ? '/signin' : '/');
            
        } catch (error) {
            if (error.response) {
                
                if (error.response.data.errors) {
                    const newErrors = {};
                    error.response.data.errors.forEach(error => {
                        newErrors[error.field] = error.message;
                    });
                    setErrors(newErrors);
                } else if (error.response.data.message) {
                    setSubmitError(error.response.data.message);
                }
            } else if (error.request) {
                
                setSubmitError('Network error. Please try again.');
            } else {
                setSubmitError('Something went wrong. Please try again.');
                console.log(error)
            }
        } finally {
            setIsLoading(false);
           
        }
    };

    return (
      <>
      <div className="w-[550px] gap-3 flex flex-col items-start px-[70px] py-[100px]">
          <div className="w-[200px]">
              <img src={logo} alt="logo" />
          </div>
          <div className="text-xl font-semibold">
              <span>Get Started with </span>
              <span className="bg-gradient-to-b from-blue-500 to-blue-900 bg-clip-text text-transparent">
                  EnvisionMRI
              </span>
          </div>

          {submitError && (
              <div className="text-red-500 text-sm w-full bg-red-50 p-2 rounded">
                  {submitError}
              </div>
          )}

          <form onSubmit={handleSubmit} className="relative flex flex-col gap-5 items-start w-full">
              {isSignup && (
                  <>
                      <div className="flex flex-col items-start self-stretch max-w-xs">
                          <p>Firstname</p>
                          <input
                              type="text"
                              name="firstname"
                              placeholder="firstname"
                              value={formData.firstname}
                              onChange={handleChange}
                              className={`border-2 border-solid ${errors.firstname ? 'border-red-500' : 'hover:border-blue-600'} focus:border-2 focus:border-blue-600 outline-none rounded-md items-center px-6 py-2 text-sm h-9 w-full transition-colors`}
                          />
                          {errors.firstname && (
                              <span className="text-red-500 text-xs mt-1">{errors.firstname}</span>
                          )}
                      </div>

                      <div className="flex flex-col gap-1 items-start self-stretch max-w-xs">
                          <p>Lastname</p>
                          <input
                              type="text"
                              name="lastname"
                              placeholder="lastname"
                              value={formData.lastname}
                              onChange={handleChange}
                              className={`border-2 border-solid ${errors.lastname ? 'border-red-500' : 'hover:border-blue-600'} focus:border-2 focus:border-blue-600 outline-none rounded-md items-center px-6 py-2 text-sm h-9 w-full transition-colors`}
                          />
                          {errors.lastname && (
                              <span className="text-red-500 text-xs mt-1">{errors.lastname}</span>
                          )}
                      </div>
                  </>
              )}

              <div className="flex flex-col gap-1 items-start self-stretch max-w-xs">
                  <p>Email</p>
                  <input
                      type="email"
                      name="email"
                      placeholder="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`border-2 border-solid ${errors.email ? 'border-red-500' : 'hover:border-blue-600'} focus:border-2 focus:border-blue-600 outline-none rounded-md items-center px-6 py-2 text-sm h-9 w-full transition-colors`}
                  />
                  {errors.email && (
                      <span className="text-red-500 text-xs mt-1">{errors.email}</span>
                  )}
              </div>

              <div className="flex flex-col gap-1 items-start self-stretch max-w-xs">
                  <p>Password</p>
                  <input
                      type="password"
                      name="password"
                      placeholder="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`border-2 border-solid ${errors.password ? 'border-red-500' : 'hover:border-blue-600'} focus:border-2 focus:border-blue-600 outline-none rounded-md items-center px-6 py-2 text-sm h-9 w-full transition-colors`}
                  />
                  {errors.password && (
                      <span className="text-red-500 text-xs mt-1">{errors.password}</span>
                  )}
              </div>

              <div className="flex flex-col gap-1 items-start self-stretch max-w-xs">
                  <button 
                      type="submit"
                      disabled={isLoading}
                      className={`w-full font-semibold h-9 rounded-lg text border-solid border text-sm
                          ${isLoading 
                              ? 'bg-blue-400 cursor-not-allowed' 
                              : 'bg-blue-600 hover:bg-blue-500 border-blue-500'} 
                          text-white`}
                  >
                      {isLoading ? (
                          <div className="flex items-center justify-center gap-2">
                              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              <span>{isSignup ? 'Signing up...' : 'Signing in...'}</span>
                          </div>
                      ) : (
                          isSignup ? 'Sign Up' : 'Sign In'
                      )}
                  </button>
                  <span>
                      {isSignup 
                          ? 'Already have an account? '
                          : "Don't have an account? "}
                      <Link 
                          className="underline text-blue-500 px-1" 
                          to={isSignup ? '/signin' : '/signup'}
                      >
                          {isSignup ? 'Log In' : 'Sign Up'}
                      </Link>
                  </span>
              </div>
          </form>
      </div>
      </>
  );
};