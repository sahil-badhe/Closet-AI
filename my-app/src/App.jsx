import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from 'react';
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import StyleCustomization from "./Components/Customize";
import Footer from "./Components/Footer";
import ResultsPage from "./Components/ResultsPage";
import Profile from "./Components/Profile";
import ProfileSetup from "./Components/ProfileSetup";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import AboutPage from "./Components/AboutUs";
import LegalSupportPage from "./Components/LegalSupportPage";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; 
}

function App() {
  return (
    <Router>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/ProfileSetup" element={<ProfileSetup />} />
        <Route path="/Customize" element={<StyleCustomization/>} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/aboutus" element={<AboutPage />} />
        <Route path="/LegalSupportPage" element={<LegalSupportPage />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;