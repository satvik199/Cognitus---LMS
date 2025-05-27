import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Main spinner container */}
      <div className="relative w-28 h-28">
        {/* Outer gradient ring */}
        <div className="absolute inset-0 rounded-full border-[6px] border-transparent border-t-blue-600 border-r-blue-400 border-b-gray-300 border-l-gray-200 animate-spin-slow"></div>

        {/* Middle gradient ring */}
        <div className="absolute inset-3 rounded-full border-[5px] border-transparent border-t-gray-200 border-r-gray-300 border-b-blue-400 border-l-blue-600 animate-spin-slow animation-delay-300"></div>

        {/* Inner gradient dot */}
        <div className="absolute inset-6 bg-gradient-to-br from-blue-500 to-gray-300 rounded-full animate-pulse-slow"></div>
      </div>

      {/* Loading text with subtle animation */}
      <p className="mt-8 text-gray-500 font-medium tracking-wider">
        <span className="animate-fade-in-out">L</span>
        <span className="animate-fade-in-out animation-delay-100">O</span>
        <span className="animate-fade-in-out animation-delay-200">A</span>
        <span className="animate-fade-in-out animation-delay-300">D</span>
        <span className="animate-fade-in-out animation-delay-400">I</span>
        <span className="animate-fade-in-out animation-delay-500">N</span>
        <span className="animate-fade-in-out animation-delay-600">G</span>

      </p>
    </div>
  );
};

export default Loading;
