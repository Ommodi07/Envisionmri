
import { BrowserRouter, Route, Routes } from "react-router-dom";
import  Navbar  from "./components/navbar";
import { Signup } from "./pages/signup";
import { Signin } from "./pages/signin";
import HomePage from "./pages/home";
import Footer from "./components/footer";
import Profile from "./pages/profile";
import ReportAnalyzer from "./pages/report-analyzer";


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
          <Route path="report-analyzer" element={<ReportAnalyzer />} />
        </Routes>
        <Footer />
    
    </BrowserRouter>
      
    </>
  );
}

export default App;