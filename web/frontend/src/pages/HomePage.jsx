import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const HomePage = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center py-10 bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto mt-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to the React App!</h1>
      <p className="text-lg text-gray-600 mb-8 text-center">
        This is your central hub for case management, sightings, and community alerts.
      </p>

      {isAuthenticated ? (
        <div className="text-center">
          <p className="text-xl text-indigo-700 font-semibold mb-4">Hello, {user?.name || user?.email}!</p>
          <Link to="/dashboard" className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors duration-300 mr-4">
            Go to Dashboard
          </Link>
          <button
            onClick={logout}
            className="px-6 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors duration-300"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex space-x-4">
          <Link to="/login" className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors duration-300">
            Login
          </Link>
          <Link to="/register" className="px-6 py-3 border border-indigo-600 text-indigo-600 font-semibold rounded-md hover:bg-indigo-50 transition-colors duration-300">
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;