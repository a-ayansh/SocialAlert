import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import Button from '../Button/Button';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center z-10 sticky top-0">
      <Link to="/" className="text-2xl font-bold text-indigo-700">
        My App
      </Link>
      <nav>
        <ul className="flex space-x-4 items-center">
          <li>
            <Link to="/cases" className="text-gray-700 hover:text-indigo-600 transition-colors duration-200">
              Cases
            </Link>
          </li>
          <li>
            <Link to="/map" className="text-gray-700 hover:text-indigo-600 transition-colors duration-200">
              Map
            </Link>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/dashboard" className="text-gray-700 hover:text-indigo-600 transition-colors duration-200">
                  Dashboard
                </Link>
              </li>
              <li>
                <Button onClick={logout} variant="secondary" className="text-sm py-1 px-3">
                  Logout
                </Button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="text-gray-700 hover:text-indigo-600 transition-colors duration-200">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-700 hover:text-indigo-600 transition-colors duration-200">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;