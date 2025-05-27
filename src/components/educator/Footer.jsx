import React from 'react';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <footer className="bg-gray-700 border-t border-blue-800 px-6 md:px-16 lg:px-40 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-white text-sm">
      
      {/* Left Section: Logo + Divider + Text */}
      <div className="flex items-center gap-4 text-center md:text-left">
        <img src={assets.logo} alt="Logo" className="w-28 md:w-32" />
        <div className="hidden md:block h-6 w-px bg-white/30"></div>
        <p className="text-xs md:text-sm text-white/70">
          © 2025 <span className="font-semibold text-white">Satvik & Swastiks</span>. All rights reserved.
        </p>
      </div>

      {/* Right Section: Social Icons */}
      <div className="flex items-center gap-4">
        <a href="#" className="hover:scale-110 transition duration-200">
          <img src={assets.facebook_icon} alt="Facebook" className="w-7 h-8" />
        </a>
        <a href="#" className="hover:scale-110 transition duration-200">
          <img src={assets.twitter_icon} alt="Twitter" className="w-7 h-8" />
        </a>
        <a href="#" className="hover:scale-110 transition duration-200">
          <img src={assets.instagram_icon} alt="Instagram" className="w-7 h-8" />
        </a>
      </div>
      
    </footer>
  );
};

export default Footer;
