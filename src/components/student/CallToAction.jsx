import React from 'react';
import { assets } from '../../assets/assets';

const CallToAction = () => {
  return (
    <div className="bg-white rounded-2xl px-6 py-12 md:px-16 md:py-16 text-center max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
        Learn anything, anytime, anywhere
      </h1>
      <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto mb-8">
        Access high-quality courses and expert guidance to accelerate your learning journey — all at your convenience.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button className="bg-gray-900 text-white font-medium py-3 px-6 rounded-xl shadow hover:bg-gray-800 transition duration-300">
          Get Started
        </button>
        <button className="flex items-center gap-2  text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-100 transition duration-300">
          Learn More
          <img src={assets.arrow_icon} alt="arrow icon" className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CallToAction;
