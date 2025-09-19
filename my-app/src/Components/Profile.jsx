import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Settings, Heart, History, Edit2, Camera, LogOut } from "lucide-react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("saved");
  const [savedOutfits, setSavedOutfits] = useState([]);
  const [userData, setUserData] = useState({
    name: "Loading...",
    profileImage:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80",
    bio: "Fashion Enthusiast",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const userPreferences = {
    style: ["Casual", "Minimalist", "Urban"],
    colors: ["Navy", "Gray", "White"],
    brands: ["Nike", "Zara", "H&M"],
    size: "Medium",
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));

        if (!currentUser?.email) {
          throw new Error("No user logged in");
        }

        const userResponse = await fetch(
          `http://localhost:5000/api/user-profile?email=${currentUser.email}`
        );

        if (userResponse.status === 404) {
          setUserData({
            name: currentUser.email.split("@")[0],
            profileImage:
              "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg",
            bio: "Fashion Enthusiast",
          });
        } else {
          if (!userResponse.ok) throw new Error("Failed to fetch user data");
          const userData = await userResponse.json();
          setUserData(userData);
        }

        const outfitsResponse = await fetch(
          `http://localhost:5000/api/saved-outfits?email=${currentUser.email}`
        );
        if (!outfitsResponse.ok)
          throw new Error("Failed to fetch saved outfits");

        const outfitsData = await outfitsResponse.json();
        setSavedOutfits(outfitsData);
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/login";
  };

  const handleRemoveOutfit = async (outfitId) => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      const response = await fetch("http://localhost:5000/api/save-outfit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: currentUser.email,
          productId: outfitId,
          action: "unlike",
        }),
      });

      if (!response.ok) throw new Error("Failed to remove outfit");

      setSavedOutfits((prev) =>
        prev.filter((outfit) => outfit.productId !== outfitId)
      );
    } catch (err) {
      console.error("Error removing outfit:", err);
      setError(err.message);
    }
  };

  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-2xl transition-colors ${
        activeTab === id
          ? "bg-indigo-600 text-white"
          : "hover:bg-indigo-50 text-gray-700"
      }`}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </button>
  );

  const SavedOutfitCard = ({ outfit }) => (
    <motion.div
      className="bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative">
        <img
          src={outfit.productImage}
          alt={outfit.productName}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/300x200?text=Outfit+Image";
          }}
        />
        <button
          onClick={() => handleRemoveOutfit(outfit.productId)}
          className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:scale-110 transition-transform"
        >
          <Heart className="h-5 w-5 text-rose-500 fill-rose-500" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-1">
          {outfit.productName}
        </h3>
        <p className="text-sm text-gray-500">
          Saved on {new Date(outfit.savedAt).toLocaleDateString()}
        </p>
        <a
          href={outfit.productUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:underline text-sm mt-2 inline-block"
        >
          View Product
        </a>
      </div>
    </motion.div>
  );

  const PreferenceCard = ({ title, items }) => (
    <div className="bg-white rounded-3xl p-4 shadow-md border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <button className="p-2 hover:bg-indigo-50 rounded-full transition-colors text-gray-600">
          <Edit2 className="h-4 w-4" />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-3xl shadow-md max-w-md">
          <div className="text-red-500 mb-4">Error: {error}</div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-3xl hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-2xl p-6 text-center mb-6 shadow-md border border-gray-100">
              <div className="relative inline-block mb-4">
                <img
                  src={userData.profileImage || "fallback_url"}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover mx-auto"
                  onError={(e) => {
                    e.target.src =
                      "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671140.jpg?t=st=1743925023~exp=1743928623~hmac=75280954476faf5cc8c6149884cb0a04208f639c30d70596ed5b14a812a181a4&w=740";
                  }}
                />
                <button className="absolute bottom-0 right-0 p-2 bg-indigo-600 rounded-full text-white hover:bg-indigo-700 transition-colors">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <h2 className="text-xl font-bold mb-1 text-gray-800">
                {userData.name}
              </h2>
              <p className="text-gray-600 text-sm mb-4">{userData.bio}</p>
              <button className="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-2xl hover:bg-indigo-700 transition-colors mb-4">
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-2xl border border-red-500 text-red-500 hover:bg-red-50 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:w-3/4">
            {activeTab === "saved" && (
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-800">
                  Saved Outfits
                </h2>
                {savedOutfits.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedOutfits.map((outfit) => (
                      <SavedOutfitCard key={outfit._id} outfit={outfit} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl p-12 text-center shadow-md border border-gray-100">
                    <Heart className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600">
                      You haven't saved any outfits yet
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "settings" && (
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-800">
                  Style Preferences
                </h2>
                <div className="grid gap-6">
                  <PreferenceCard
                    title="Style Types"
                    items={userPreferences.style}
                  />
                  <PreferenceCard
                    title="Preferred Colors"
                    items={userPreferences.colors}
                  />
                  <PreferenceCard
                    title="Favorite Brands"
                    items={userPreferences.brands}
                  />
                </div>
              </div>
            )}

            {activeTab === "history" && (
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-800">
                  Browse History
                </h2>
                <div className="bg-white rounded-2xl p-12 text-center shadow-md border border-gray-100">
                  <History className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600">
                    Your browsing history will appear here
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
