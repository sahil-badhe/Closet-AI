import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Share2, ShoppingBag, Sparkles, ArrowLeft, Filter, Tag, Info } from "lucide-react";
import { useState, useEffect } from "react";

const SkeletonCard = () => (
  <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
    <div className="h-64 bg-gray-200" />
    <div className="p-5 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="pt-4 flex justify-between">
        <div className="h-10 bg-gray-200 rounded-xl w-full mr-2" />
        <div className="h-10 bg-gray-200 rounded-xl w-12" />
      </div>
    </div>
  </div>
);

const ResultsPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState(state?.recommendations || []);
  const [filteredRecs, setFilteredRecs] = useState(state?.recommendations || []);
  const [likedProducts, setLikedProducts] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(!state?.recommendations);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...new Set(recommendations.map(r => r.category))];

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredRecs(recommendations);
    } else {
      setFilteredRecs(recommendations.filter(r => r.category === activeCategory));
    }
  }, [activeCategory, recommendations]);

  const toggleLike = (id) => {
    setLikedProducts(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Navigation */}
        <div className="flex items-center justify-between mb-8">
          <motion.button
            onClick={() => navigate("/customize")}
            className="flex items-center text-gray-500 hover:text-indigo-600 transition-colors font-medium group"
            whileHover={{ x: -4 }}
          >
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:stroke-indigo-600" />
            Back to Stylist
          </motion.button>
          
          <div className="flex items-center space-x-2 bg-white p-1 rounded-2xl shadow-sm border border-gray-100">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeCategory === cat ? "bg-indigo-600 text-white shadow-md" : "text-gray-500 hover:bg-gray-50"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-4"
          >
            <Sparkles className="h-4 w-4 text-indigo-600 mr-2" />
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">AI Curated Collection</span>
          </motion.div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Your <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">Closet AI</span> Picks
          </h1>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            Our Stylist AI analyzed your profile to find these perfect matches.
          </p>
        </div>

        {/* Grid Area */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {isPageLoading ? (
            Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)
          ) : (
            <AnimatePresence>
              {filteredRecs.map((product) => (
                <motion.div
                  key={product.productId}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -8 }}
                  className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
                >
                  {/* Image Container */}
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <button
                      onClick={() => toggleLike(product.productId)}
                      className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:scale-110 transition-transform active:scale-95"
                    >
                      <Heart className={`h-5 w-5 ${likedProducts.includes(product.productId) ? "fill-rose-500 text-rose-500" : "text-gray-400"}`} />
                    </button>

                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg shadow-lg">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-indigo-600 transition-colors">
                        {product.name}
                      </h3>
                      <span className="text-xl font-black text-gray-900">{product.price}</span>
                    </div>
                    
                    <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                      {product.description}
                    </p>

                    {/* AI Stylist Reason */}
                    <div className="bg-indigo-50/50 rounded-2xl p-3 mb-6 border border-indigo-100/50 relative overflow-hidden">
                      <div className="flex items-start">
                        <Info className="h-4 w-4 text-indigo-500 mt-0.5 mr-2 flex-shrink-0" />
                        <p className="text-[11px] text-indigo-700 leading-relaxed font-medium italic">
                          "{product.style_reason}"
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-auto flex space-x-2">
                      <a
                        href={product.detail_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gray-900 text-white py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center space-x-2 hover:bg-indigo-600 transition-all shadow-lg active:scale-95"
                      >
                        <ShoppingBag className="h-4 w-4" />
                        <span>View Details</span>
                      </a>
                      <button 
                        className="p-3.5 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-colors"
                        onClick={() => {
                          navigator.clipboard.writeText(product.detail_url);
                          alert("Link copied to clipboard!");
                        }}
                      >
                        <Share2 className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {!isPageLoading && filteredRecs.length === 0 && (
          <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-gray-200">
            <Filter className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900">No items match this filter</h3>
            <p className="text-gray-500">Try selecting a different category or retake the quiz.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;