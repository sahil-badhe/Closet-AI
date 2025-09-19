import { ArrowRight, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 opacity-50 z-0"></div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/80 backdrop-blur-sm"
            initial={{
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              opacity: 0,
              scale: 0.5,
            }}
            animate={{
              x: Math.random() * 500 - 250,
              y: Math.random() * 500 - 250,
              opacity: [0, 0.1, 0],
              scale: [0.5, 1.2, 0.8],
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 10,
            }}
            style={{
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Ready to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
              Redefine
            </span>{" "}
            Your Style?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-2xl mx-auto mb-10"
          >
            Join thousands discovering their perfect style with our AI fashion
            assistant.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <motion.button
              onClick={() => navigate("/customize")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="group relative px-8 py-3 flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-semibold rounded-full overflow-hidden shadow-md hover:shadow-lg"
            >
              <span className="relative z-10">Start Free Trial</span>
              <ArrowRight
                className="relative z-10 transition-transform group-hover:translate-x-1 duration-300"
                size={20}
              />
            </motion.button>

            <motion.button
              onClick={() => navigate("/customize")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="group relative px-8 py-3 flex items-center gap-2 bg-white text-gray-900 text-lg font-semibold rounded-full border-2 border-gray-200 hover:border-indigo-300 transition-all shadow-sm"
            >
              <span className="relative z-10">See How It Works</span>
              <ChevronRight
                className="relative z-10 transition-transform group-hover:translate-x-1 duration-300"
                size={20}
              />
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-8 flex items-center justify-center gap-4 text-sm text-gray-500"
          >
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={`https://randomuser.me/api/portraits/${
                    Math.random() > 0.5 ? "men" : "women"
                  }/${Math.floor(Math.random() * 50)}.jpg`}
                  alt="User"
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
              ))}
            </div>
            <span>Trusted by 10,000+ fashion lovers</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
