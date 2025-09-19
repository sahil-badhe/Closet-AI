import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Sun,
  CloudRain,
  CloudSun,
  CloudSnow,
  Check,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import male from "../assets/male.jpg";
import female from "../assets/female.jpg";
import binary from "../assets/binary.jpg";
import summer from "../assets/summer.jpg";
import rain from "../assets/rain.jpg";
import winter from "../assets/winter.jpg";
import spring from "../assets/spring.jpg";
import casual from "../assets/casual.jpg";
import formal from "../assets/formal.jpg";
import ethnic from "../assets/ethnic.webp";
import streetwear from "../assets/streetwear.jpg";
import sporty from "../assets/sporty.webp";
import vintage from "../assets/vintage.jpg";
import bohemian from "../assets/bohemia.jpg";
import minimalist from "../assets/minimalist.jpg";

const StyleCustomization = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 5;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [completed, setCompleted] = useState([]);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedSkinTone, setSelectedSkinTone] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [selectedStyles, setSelectedStyles] = useState([]);

  const genderOptions = [
    {
      id: "male",
      label: "Male",
      value: "male",
      image: male,
    },
    {
      id: "female",
      label: "Female",
      value: "female",
      image: female,
    },
    {
      id: "non-binary",
      label: "Non-binary",
      value: "non-binary",
      image: binary,
    },
  ];

  const ageGroups = [
    { id: "18-24", label: "18-24", value: "18-24" },
    { id: "25-34", label: "25-34", value: "25-34" },
    { id: "35-44", label: "35-44", value: "35-44" },
    { id: "45-plus", label: "45+", value: "45+" },
  ];

  const skinTones = [
    { id: "light", label: "Light", value: "light", color: "#FFE5D6" },
    { id: "medium", label: "Medium", value: "medium", color: "#E5C5A5" },
    { id: "olive", label: "Olive", value: "olive", color: "#C4A98D" },
    { id: "dark", label: "Dark", value: "dark", color: "#8D6346" },
  ];

  const seasons = [
    {
      id: "spring",
      label: "Spring",
      value: "spring",
      icon: <CloudSun className="h-6 w-6" />,
      image: spring,
    },
    {
      id: "summer",
      label: "Summer",
      value: "summer",
      icon: <Sun className="h-6 w-6" />,
      image: summer,
    },
    {
      id: "autumn",
      label: "Rain",
      value: "Rain",
      icon: <CloudRain className="h-6 w-6" />,
      image: rain,
    },
    {
      id: "winter",
      label: "Winter",
      value: "winter",
      icon: <CloudSnow className="h-6 w-6" />,
      image: winter,
    },
  ];

  const stylePreferences = [
    { id: "casual", label: "Casual", value: "casual", image: casual },
    { id: "formal", label: "Formal", value: "formal", image: formal },
    { id: "ethnic", label: "Ethnic", value: "ethnic", image: ethnic },
    {
      id: "streetwear",
      label: "Streetwear",
      value: "streetwear",
      image: streetwear,
    },
    { id: "bohemian", label: "Bohemian", value: "bohemian", image: bohemian },
    { id: "sporty", label: "Sporty", value: "sporty", image: sporty },
    {
      id: "minimalist",
      label: "Minimalist",
      value: "minimalist",
      image: minimalist,
    },
    { id: "vintage", label: "Vintage", value: "vintage", image: vintage },
  ];

  const handleOptionSelect = (stepNumber, value) => {
    if (stepNumber === 1) {
      setSelectedGender(value);
    } else if (stepNumber === 2) {
      setSelectedAge(value);
    } else if (stepNumber === 3) {
      setSelectedSkinTone(value);
    } else if (stepNumber === 4) {
      setSelectedSeason(value);
    }

    if (!completed.includes(stepNumber)) {
      setCompleted([...completed, stepNumber]);
    }
  };

  const handleNext = () => {
    const hasSelection =
      (step === 1 && selectedGender) ||
      (step === 2 && selectedAge) ||
      (step === 3 && selectedSkinTone) ||
      (step === 4 && selectedSeason) ||
      step === 5;

    if (hasSelection) {
      setStep(step + 1);
    }
  };

  const handleStyleSelect = (styleId) => {
    setSelectedStyles((prev) => {
      if (prev.includes(styleId)) {
        return prev.filter((id) => id !== styleId);
      } else {
        return [...prev, styleId];
      }
    });
  };

  const handleComplete = async () => {
    if (!completed.includes(5)) {
      setCompleted([...completed, 5]);
    }

    setIsLoading(true);

    try {
      const recommendations = await sendDataToServer();
      navigate("/results", { state: { recommendations } });
    } catch (error) {
      console.error("Failed to get recommendations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendDataToServer = async () => {
    const userPreferences = {
      gender: selectedGender,
      age: selectedAge,
      skinTone: selectedSkinTone,
      season: selectedSeason,
      styles: selectedStyles,
    };

    try {
      const response = await fetch(
        "http://localhost:5001/api/recommendations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userPreferences),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error sending data to server:", error);
      throw error;
    }
  };

  const renderProgressBar = () => (
    <div className="mb-12">
      <div className="flex justify-between mb-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
              completed.includes(index + 1)
                ? "bg-indigo-500 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {completed.includes(index + 1) ? (
              <Check className="h-5 w-5" />
            ) : (
              index + 1
            )}
          </div>
        ))}
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2.5">
        <motion.div
          className="bg-gradient-to-r from-indigo-400 to-indigo-600 h-2.5 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(completed.length / totalSteps) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <div className="text-center mt-3 text-gray-600 font-medium">
        Step {completed.length} of {totalSteps}
      </div>
    </div>
  );

  const renderImageOptions = (
    options,
    isMultiSelect = false,
    selectedItems = []
  ) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {options.map((option) => (
        <motion.button
          key={option.id}
          onClick={() =>
            isMultiSelect
              ? handleStyleSelect(option.id)
              : handleOptionSelect(step, option.value)
          }
          className={`relative overflow-hidden rounded-3xl transition-all ${
            (isMultiSelect && selectedItems.includes(option.id)) ||
            (!isMultiSelect && step === 1 && selectedGender === option.value) ||
            (step === 2 && selectedAge === option.value) ||
            (step === 3 && selectedSkinTone === option.value)
              ? "border-4 border-indigo-500 ring-offset-2"
              : "hover:border-4 hover:border-indigo-200"
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <img
            src={option.image}
            alt={option.label}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">{option.label}</h3>
            {isMultiSelect && selectedItems.includes(option.id) && (
              <div className="bg-indigo-500 rounded-full p-1.5">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
        </motion.button>
      ))}
    </div>
  );

  const renderSkinTones = () => (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {skinTones.map((tone) => (
        <motion.button
          key={tone.id}
          onClick={() => handleOptionSelect(step, tone.value)}
          className={`p-4 rounded-xl text-center transition-all ${
            selectedSkinTone === tone.value
              ? "ring-2 ring-indigo-500 ring-offset-2 bg-indigo-50"
              : "bg-white hover:bg-gray-50"
          }`}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <div
            className="w-16 h-16 rounded-full mx-auto mb-3 shadow-inner"
            style={{ backgroundColor: tone.color }}
          />
          <h3 className="text-sm font-medium text-gray-700">{tone.label}</h3>
        </motion.button>
      ))}
    </div>
  );
 
  const renderSeasons = () => (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {seasons.map((season) => (
        <motion.button
          key={season.id}
          onClick={() => handleOptionSelect(step, season.value)}
          className={`relative overflow-hidden rounded-2xl transition-all ${
            selectedSeason === season.value
              ? "border-3 border-indigo-500 ring-offset-2"
              : "hover:border-3 hover:border-indigo-200"
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <img
            src={season.image}
            alt={season.label}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 flex items-center text-white">
            {season.icon}
            <h3 className="ml-2 text-sm font-semibold">{season.label}</h3>
          </div>
        </motion.button>
      ))}
    </div>
  );

  const renderAgeGroups = () => (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {ageGroups.map((age) => (
        <motion.button
          key={age.id}
          onClick={() => handleOptionSelect(step, age.value)}
          className={`p-4 rounded-2xl text-center transition-all ${
            selectedAge === age.value
              ? "ring-2 ring-indigo-500 ring-offset-2 bg-indigo-50"
              : "bg-white hover:bg-gray-50"
          }`}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl font-bold text-indigo-600">
              {age.label.includes("+") ? age.label : age.label.split("-")[0]}
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-700">
            {age.label.includes("+") ? "45+ years" : `${age.label} years`}
          </h3>
        </motion.button>
      ))}
    </div>
  );

  const renderCompletionCard = () => (
    <div className="text-center py-8">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl p-8 max-w-md mx-auto shadow-lg border border-gray-100"
      >
        <div className="mb-6">
          <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-10 w-10 text-indigo-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            All Set! Your Style Profile is Complete
          </h2>
          <p className="text-gray-600 text-sm">
            Our AI is analyzing your preferences to create personalized style recommendations.
          </p>
        </div>
        <motion.button
          onClick={handleComplete}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-medium py-3 px-6 rounded-full inline-flex items-center shadow-md"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
              Generating...
            </>
          ) : (
            <>
              View Recommendations
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </motion.button>
      </motion.div>
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              What's Your Gender Identity?
            </h2>
            <p className="text-center text-gray-500 mb-8">
              Select the option that best represents you
            </p>
            {renderImageOptions(genderOptions)}
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              How Old Are You?
            </h2>
            <p className="text-center text-gray-500 mb-8">
              This helps us tailor age-appropriate recommendations
            </p>
            {renderAgeGroups()}
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              What's Your Skin Tone?
            </h2>
            <p className="text-center text-gray-500 mb-8">
              Select the closest match for color recommendations
            </p>
            {renderSkinTones()}
          </div>
        );
      case 4:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Favorite Seasonal Style?
            </h2>
            <p className="text-center text-gray-500 mb-8">
              Choose the season you enjoy dressing for most
            </p>
            {renderSeasons()}
          </div>
        );
      case 5:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">
              Select Your Style Preferences
            </h2>
            <p className="text-center text-gray-500 mb-6">
              Choose as many as you like (optional)
            </p>
            {renderImageOptions(stylePreferences, true, selectedStyles)}
          </div>
        );
      case 6:
        return renderCompletionCard();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100"
        >
          {step !== 6 && (
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Create Your <span className="text-indigo-600">Style Profile</span>
              </h1>
              <p className="text-gray-500">
                Answer a few questions to get personalized recommendations
              </p>
            </div>
          )}
          
          {step !== 6 && renderProgressBar()}
          
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>

          {step !== 6 && (
            <div className="flex justify-between mt-12">
              <motion.button
                onClick={() => setStep(Math.max(1, step - 1))}
                className={`flex items-center px-5 py-2.5 rounded-2xl font-medium ${
                  step === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-indigo-600 hover:bg-indigo-50"
                }`}
                disabled={step === 1}
                whileHover={{ scale: step !== 1 ? 1.03 : 1 }}
                whileTap={{ scale: step !== 1 ? 0.97 : 1 }}
              >
                <ChevronLeft className="mr-1 h-5 w-5" />
                Back
              </motion.button>
              
              <motion.button
                onClick={() => (step === totalSteps ? handleComplete() : handleNext())}
                disabled={(step === totalSteps && isLoading) || 
                         (step === 1 && !selectedGender) ||
                         (step === 2 && !selectedAge) ||
                         (step === 3 && !selectedSkinTone) ||
                         (step === 4 && !selectedSeason)}
                className={`px-6 py-2.5 rounded-2xl font-medium flex items-center ${
                  step === totalSteps
                    ? "bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white shadow-md"
                    : "bg-indigo-500 hover:bg-indigo-600 text-white"
                }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {step === totalSteps ? (
                  isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                      Processing...
                    </>
                  ) : (
                    "Start Analyzing"
                  )
                ) : (
                  <>
                    Next
                    <ChevronRight className="ml-1 h-5 w-5" />
                  </>
                )}
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default StyleCustomization;