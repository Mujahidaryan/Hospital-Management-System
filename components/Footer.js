import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-8">
      <div className="container mx-auto text-center px-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} YourApp. All rights reserved.
        </p>
        <p className="text-xs mt-1 text-gray-400">Made with ❤️ using Tailwind CSS</p>
      </div>
    </footer>
  );
};

export default Footer;
