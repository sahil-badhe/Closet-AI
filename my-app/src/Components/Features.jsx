import React from "react";
import { motion } from "framer-motion";
import { Star, Palette, Wand2, ScanSearch } from "lucide-react";
import feature1 from "../assets/feature-1.webp";
import feature2 from "../assets/feature-2.jpg";
import feature3 from "../assets/feature-3.jpg";
import feature4 from "../assets/feature-4.jpg";

const features = [
  {
    image: feature1,
    icon: <Wand2 className="h-6 w-6 text-pink-600" />,
    title: "AI-Powered Recommendations",
    description: "Get personalized style suggestions based on your preferences, body type, and occasion.",
    color: "from-pink-50 to-pink-400"
  },
  {
    image: feature2,
    icon: <Palette className="h-6 w-6 text-blue-600" />,
    title: "Style DNA Analysis",
    description: "Our AI creates your unique fashion profile with just a few questions.",
    color: "from-blue-100 to-blue-200"
  },
  {
    image: feature3,
    icon: <ScanSearch className="h-6 w-6 text-green-600" />,
    title: "Smart Closet",
    description: "Organize, mix & match your wardrobe with intelligent suggestions.",
    color: "from-green-100 to-green-200"
  },
  {
    image: feature4,
    icon: <Star className="h-6 w-6 text-amber-600" />,
    title: "Trend Matching",
    description: "Stay fashionable with recommendations that match current trends to your taste.",
    color: "from-amber-100 to-amber-200"
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">AI Fashion</span> Companion
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Discover how our technology revolutionizes your personal style journey.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br border border-gray-200 hover:border-gray-300 transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-60`}></div>
              
              <div className="relative z-10 p-8 h-full flex flex-col">
                <div className="mb-6 p-3 bg-white/70 backdrop-blur-sm rounded-2xl w-12 h-12 flex items-center justify-center group-hover:bg-white transition-all">
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-800 flex-grow">{feature.description}</p>
                
                <div className="mt-6 pt-6 border-t border-gray-200 group-hover:border-gray-300 transition-all">
                  <button className="text-sm font-medium text-gray-600 hover:text-gray-950 transition-colors flex items-center gap-1">
                    Learn more
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-right">
                      <path d="M7 7h10v10" />
                      <path d="M7 17 17 7" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <img
                src={feature.image}
                alt={feature.title}
                className="absolute inset-0 w-full h-full object-cover bg-black group-hover:opacity-20 transition-opacity duration-500"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
