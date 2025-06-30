import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-6 text-center mt-auto">
      <div className="container mx-auto">
        <p className="mb-2">&copy; {new Date().getFullYear()} My App. All rights reserved.</p>
        <nav className="flex justify-center space-x-4 text-sm">
          <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
          <Link to="/terms" className="hover:underline">Terms of Service</Link>
          <Link to="/contact" className="hover:underline">Contact Us</Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;