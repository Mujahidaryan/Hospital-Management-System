import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-900 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <Link to="/" className="text-3xl font-bold mb-2 md:mb-0">
          MindScape
        </Link>
        <nav className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
          <Link to="/" className="hover:text-blue-400 transition duration-200">
            Home
          </Link>
          <Link to="/about" className="hover:text-blue-400 transition duration-200">
            About
          </Link>
          <Link to="/features" className="hover:text-blue-400 transition duration-200">
            Features
          </Link>
          <Link to="/signup" className="hover:text-blue-400 transition duration-200">
            Sign Up
          </Link>
          <Link to="/login" className="hover:text-blue-400 transition duration-200">
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
