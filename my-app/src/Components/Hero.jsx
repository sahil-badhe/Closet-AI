import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "../assets/hero.jpg";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/30 to-black/80 z-0"></div>
        <img
          src={heroImage}
          alt="Fashion background"
          className="w-full h-full object-cover "
        />

        {/* Animated floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10 backdrop-blur-sm"
            initial={{
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              opacity: 0,
              scale: 0.5,
            }}
            animate={{
              x: Math.random() * 500 - 250,
              y: Math.random() * 500 - 250,
              opacity: [0, 0.3, 0],
              scale: [0.5, 1.2, 0.8],
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 5,
            }}
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-6xl w-full flex flex-col items-center relative z-10"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-8 flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20"
        >
          <Sparkles className="h-4 w-4 text-yellow-100" />
          <span className="text-sm text-white">
            AI-Powered Fashion Assistant
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-7xl font-bold text-white tracking-tight leading-tight"
        >
          Elevate Your{" "}
          <span className="relative">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 1 }}
              className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400"
            >
              Personal Style
            </motion.span>
            <motion.span
              className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500/50 via-purple-500/50 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                delay: 1.2,
                duration: 1.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="text-xl text-gray-100 max-w-3xl mx-auto mt-8 leading-relaxed"
        >
          Our AI stylist learns your unique taste to deliver personalized
          fashion recommendations that evolve with your style journey.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-12 w-full flex flex-col sm:flex-row justify-center gap-4"
        >
          <motion.button
            onClick={() => navigate("/customize")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="group relative px-8 py-4 flex items-center gap-2 bg-white text-black text-lg font-medium rounded-full overflow-hidden"
          >
            <span className="relative z-10">Get Started</span>
            <ArrowRight
              className="relative z-10 transition-transform group-hover:translate-x-1 duration-300"
              size={20}
            />
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-sm text-white/60 mb-2">Scroll to explore</span>
        <div className="w-4 h-8 rounded-full border-2 border-white/30 relative">
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-2 bg-white rounded-full absolute top-1 left-1/2 -translate-x-1/2"
          />
        </div>
      </motion.div>
    </section>
  );
}; 

export default Hero;
