import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Share2, ShoppingBag, Sparkles, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResultsPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const recommendations = state?.recommendations || [];
  const [likedProducts, setLikedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(
      () => setNotification({ show: false, message: "", type: "" }),
      3000
    );
  };

  const toggleLike = async (productId) => {
    try {
      if (!productId || productId === "undefined") {
        throw new Error("Invalid product ID");
      }

      if (!Array.isArray(recommendations) || recommendations.length === 0) {
        console.error("Recommendations array is empty or invalid");
        return;
      }

      const validRecommendations = recommendations.filter(p => p?.productId);
      const product = validRecommendations.find(p => p.productId === productId);
      
      if (!product) {
        console.error("Product not found in valid recommendations");
        throw new Error("Product not found");
      }

      setIsLoading(true);
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      const userEmail = currentUser?.email;

      if (!userEmail) {
        showNotification("Please login to save outfits", "error");
        return;
      }

      const randomId = Math.floor(10000000 + Math.random() * 90000000);
      const customProductId = `${userEmail}_${randomId}`;

      const isCurrentlyLiked = likedProducts.includes(productId);
      const likeData = {
        userEmail,
        productId: customProductId,
        productName: product.name || "Unnamed Product",
        productImage: product.image_url || "",
        productPrice: product.price || "N/A",
        productUrl: product.detail_url || "",
        action: isCurrentlyLiked ? "unlike" : "like",
      };

      const response = await fetch("http://localhost:5000/api/save-outfit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(likeData),
      });

      const data = await response.json();
      if (!response.ok) {
        if (data.message.includes("already saved")) {
          setLikedProducts((prev) => Array.from(new Set([...prev, productId])));
        }
        throw new Error(data.message || "Failed to save outfit");
      }

      setLikedProducts((prev) =>
        isCurrentlyLiked
          ? prev.filter((id) => id !== productId)
          : [...prev, productId]
      );

      showNotification(isCurrentlyLiked ? "Outfit removed" : "Outfit saved!");
    } catch (error) {
      console.error("Error:", error);
      showNotification(error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-b from-indigo-50 to-white">
      {/* Notification */}
      {notification.show && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg flex items-center ${
            notification.type === "error"
              ? "bg-red-100 text-red-800 border border-red-200"
              : "bg-green-100 text-green-800 border border-green-200"
          }`}
        >
          {notification.type === "error" ? (
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
          {notification.message}
        </motion.div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate(-1)}
          className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
          whileHover={{ x: -3 }}
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to quiz
        </motion.button>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center justify-center mb-4 bg-white/80 backdrop-blur-sm px-5 py-2 rounded-full border border-indigo-100 shadow-sm"
          >
            <Sparkles className="h-5 w-5 text-indigo-600 mr-2" />
            <span className="text-indigo-600 font-medium">
              AI-Powered Recommendations
            </span>
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Personalized</span> Style
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Handpicked recommendations based on your unique preferences
          </p>
        </motion.div>

        {/* Results Grid */}
        {recommendations.length > 0 ? (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-4 gap-6"
          >
            {recommendations.map((product) => (
              <motion.div
                key={product.productId}
                variants={item}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                whileHover={{ y: -5 }}
              >
                {/* Product Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <button
                    onClick={() => toggleLike(product.productId)}
                    disabled={isLoading}
                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:scale-110 transition-transform"
                  >
                    {isLoading && likedProducts.includes(product.productId) ? (
                      <svg
                        className="animate-spin h-5 w-5 text-rose-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      <Heart
                        className={`h-5 w-5 transition-colors ${
                          likedProducts.includes(product.productId)
                            ? "fill-rose-500 text-rose-500"
                            : "text-gray-400 hover:text-rose-400"
                        }`}
                      />
                    )}
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
                      {product.name}
                    </h3>
                    <span className="text-lg font-semibold text-indigo-600 whitespace-nowrap ml-3">
                      {product.price}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between items-center mt-5">
                    <a 
                      href={product.detail_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 mr-3 px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-medium rounded-2xl flex items-center justify-center space-x-2 hover:shadow-md transition-all"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      <span>Buy Now</span>
                    </a>
                    <button 
                      className="p-3 rounded-2xl border border-gray-200 hover:bg-gray-50 transition-colors"
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: product.name,
                            text: `Check out this ${product.name} I found!`,
                            url: product.detail_url,
                          }).catch(console.error);
                        } else {
                          navigator.clipboard.writeText(product.detail_url);
                          showNotification("Link copied to clipboard");
                        }
                      }}
                    >
                      <Share2 className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100"
          >
            <div className="mx-auto w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
              <Sparkles className="h-8 w-8 text-indigo-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No recommendations found
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              We couldn't find any matches based on your preferences. Try adjusting your style choices.
            </p>
            <motion.button
              onClick={() => navigate("/customize")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-medium rounded-lg hover:shadow-md transition-all"
            >
              Retake Style Quiz
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;