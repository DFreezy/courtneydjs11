// Login.jsx
import React, { useState } from 'react';
import { FaFacebook, FaGoogle, FaTwitter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './login.css'; 

const Login = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent default form submission behavior (if using a form)
    
    // Perform authentication logic here (e.g., API call, local state check)
    // For demonstration, assume login is successful
    navigate('/showhome'); // Navigate to '/homepage' route upon successful login
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg">
        <form className="max-w-md mx-auto" onSubmit={handleLogin}>
          <h2 className="text-2xl font-semibold text-center mb-4">Log In</h2>
          <div className="mb-4">
            <input type="email" placeholder="Email" required className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div className="mb-4">
            <input type="password" placeholder="Password" required className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
            Log In
          </button>
          <p className="text-center mt-4">
            New user? <a href="/signup" className="text-blue-500">Sign Up</a>
          </p>
          <div className="flex justify-center mt-4">
            <FaFacebook className="text-3xl text-blue-600 mx-2" />
            <FaGoogle className="text-3xl text-red-600 mx-2" />
            <FaTwitter className="text-3xl text-blue-400 mx-2" />
          </div>
          <p className="text-center text-red-500 mt-4">If an error occurs when filling out the form, a message will show here.</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
