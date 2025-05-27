import React, { useContext } from "react";
import { assets } from '../../assets/assets';
import { Link, useLocation } from "react-router-dom";
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { AppContext } from "../../context/AppContext";

const Navbar = () => {
  const location = useLocation();
  const { navigate, isEducator } = useContext(AppContext);
  const isCourseListPage = location.pathname.includes("/course-list");
  const { openSignIn } = useClerk();
  const { user } = useUser();

  return (
    <div
      className={`flex items-center justify-between px-6 py-5 sm:px-12 md:px-16 lg:px-40 border-b border-gray-100 bg-white/95 backdrop-blur-sm shadow-md transition duration-300 ease-out sticky top-0 z-50 ${
        isCourseListPage
          ? "bg-gradient-to-b from-gray-50 to-white/95"
          : "bg-gradient-to-b from-gray-100 to-gray-200/95"
      }`}
    >
      {/* Logo */}
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="Logo"
        className="w-32 lg:w-36 cursor-pointer"
      />

      {/* Desktop View */}
      <div className="hidden md:flex items-center gap-5 text-gray-500">
        {user && (
          <div className="flex items-center gap-6 text-gray-600 font-medium">
            <button
              onClick={() => navigate('/educator')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition duration-300"
            >
              {isEducator ? "Become Student" : "Become Educator"}
            </button>

            <span className="text-gray-400">|</span>

            <Link
              to="/my-enrollments"
              className="hover:text-blue-600 transition duration-300"
            >
              My Enrollments
            </Link>
          </div>
        )}

        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={openSignIn}
            className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-green-500 hover:to-green-400 text-white font-semibold rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300 ease-in-out transform hover:scale-105 active:scale-95 px-6 py-3"
          >
            Create Account
          </button>
        )}
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex items-center gap-2 sm:gap-5 text-gray-600">
        {user && (
          <>
            <button
              onClick={() => navigate('/educator')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition duration-300"
            >
              {isEducator ? "Become Student" : "Become Educator"}
            </button>
            <span className="text-gray-400">|</span>
            <Link to="/my-enrollments">My Enrollments</Link>
          </>
        )}

        {user ? (
          <UserButton />
        ) : (
          <button onClick={openSignIn}>
            <img src={assets.user_icon} alt="User" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
