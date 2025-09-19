import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/ClosetAI.png";

const Navbar = () => {
  const navigate = useNavigate();

  const handleNavigation = (item) => {
    const path = 
      item === "Home" ? "/" : 
      item === "Style Quiz" ? "/customize" : 
      `/${item.toLowerCase()}`;
    
    if (item === "Profile") {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      
      if (!isLoggedIn) {
        navigate('/login', { state: { from: path } });
        return;
      }
    }
    
    navigate(path);
  };

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <button 
            onClick={() => navigate("/")} 
            className="flex items-center"
          >
            <img 
              src={logo} 
              alt="Logo" 
              className="h-24 w-auto rounded-lg"
            />
          </button>

          <div className="flex items-center space-x-6">
            {["Home", "Style Quiz", "Profile", "AboutUs"].map((item) => (
              <button
                key={item}
                onClick={() => handleNavigation(item)}
                className="text-gray-600 hover:text-indigo-600 transition-colors text-sm font-medium px-3 py-2 relative group"
              >
                {item}
                <span className="absolute bottom-0 left-0 h-0.5 bg-indigo-600 w-0 group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  ); 
};

export default Navbar;