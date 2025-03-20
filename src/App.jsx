
import { BrowserRouter, Route, Routes } from "react-router-dom";
import  Navbar  from "./components/navbar";
import { Signup } from "./pages/signup";
import { Signin } from "./pages/signin";
import HomePage from "./pages/home";
import Footer from "./components/footer";
import Profile from "./pages/profile";
import ReportAnalyzer from "./pages/report-analyzer";
import ErrorPage from "./pages/Error";
import ManagePatient from "./pages/managepatient";
import ChatBot from "./components/chatbot";


function App() {
  return (
    <>
    <BrowserRouter>
     
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/report-analyzer" element={<ReportAnalyzer />} />
          <Route path="*" element={<ErrorPage/>} />
          <Route path="/manage-patient" element={<ManagePatient/>} />
          <Route path="/chat" element={<ChatBot/>}/>
        </Routes>
        <Footer />
    
    </BrowserRouter>
      
    </>
  );
}

export default App;