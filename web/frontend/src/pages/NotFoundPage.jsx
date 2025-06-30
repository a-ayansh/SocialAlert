import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-bold text-indigo-600 mb-4">404</h1>
      <p className="text-2xl font-semibold mb-8">Page Not Found</p>
      <p className="text-lg text-center mb-8">
        Oops! The page you're looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/" className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors duration-300">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;