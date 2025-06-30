import React from 'react';
import useAuth from '../../hooks/useAuth';

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">User Dashboard</h1>
      {user ? (
        <>
          <p className="text-lg text-gray-700 mb-2">Welcome back, <span className="font-semibold text-indigo-600">{user.name || user.email}</span>!</p>
          <p className="text-gray-600">This is your personalized dashboard. Here you can see an overview of your cases, sightings, and notifications.</p>
          {/* Add more dashboard content here */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Your Cases</h3>
              <p className="text-blue-700">View and manage the cases you've created or are following.</p>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">View Cases</button>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h3 className="text-xl font-semibold text-green-800 mb-3">Your Sightings</h3>
              <p className="text-green-700">Review your reported sightings and their statuses.</p>
              <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">View Sightings</button>
            </div>
          </div>
        </>
      ) : (
        <p className="text-lg text-gray-700">Please log in to view your dashboard.</p>
      )}
    </div>
  );
};

export default DashboardPage;