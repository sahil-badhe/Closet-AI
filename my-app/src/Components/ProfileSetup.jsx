import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileSetup = () => {
  const [fullName, setFullName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName.trim()) {
      setError('Please enter your full name');
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      const tempUser = JSON.parse(localStorage.getItem('tempUser'));

      if (!tempUser) {
        throw new Error('User data not found');
      }

      const formData = new FormData();

      formData.append('email', tempUser.email);
      formData.append('password', tempUser.password);
      formData.append('fullName', fullName);

      if (photo) {
        formData.append('profileImage', photo);
      }

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/api/register`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      localStorage.removeItem('tempUser');

      navigate('/login');

    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to complete registration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Complete Your Profile
        </h1>

        {error && (
          <p className="text-red-500 mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>

          <div className="mb-6 flex flex-col items-center">

            <div className="relative mb-4">
              <img
                src={preview || 'https://via.placeholder.com/150'}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
              />

              <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700">

                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />

                📷
              </label>
            </div>

            <p className="text-gray-600 text-sm">
              Add profile photo
            </p>

          </div>

          <div className="mb-6">

            <label
              className="block text-gray-700 mb-2"
              htmlFor="fullName"
            >
              Full Name
            </label>

            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex justify-center items-center ${
              isLoading
                ? 'opacity-75 cursor-not-allowed'
                : ''
            }`}
          >
            {isLoading ? 'Saving...' : 'Save Profile'}
          </button>

        </form>
      </div>
    </div>
  );
};

export default ProfileSetup;
