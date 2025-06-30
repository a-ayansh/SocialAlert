import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  // You would typically make sidebar links dynamic based on auth state/roles
  return (
    <aside className="w-64 bg-gray-800 text-white p-4 hidden md:block"> {/* Hidden on small screens by default */}
      <nav>
        <ul>
          <li className="mb-2">
            <Link to="/dashboard" className="block p-2 rounded-md hover:bg-gray-700 transition-colors duration-200">
              Dashboard
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/cases" className="block p-2 rounded-md hover:bg-gray-700 transition-colors duration-200">
              Cases
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/sightings" className="block p-2 rounded-md hover:bg-gray-700 transition-colors duration-200">
              Sightings
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/notifications" className="block p-2 rounded-md hover:bg-gray-700 transition-colors duration-200">
              Notifications
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/settings" className="block p-2 rounded-md hover:bg-gray-700 transition-colors duration-200">
              Settings
            </Link>
          </li>
          {/* Add more links based on user roles / features */}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;