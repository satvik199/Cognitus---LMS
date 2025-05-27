import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const { user } = useUser();

  return (
    <div className="flex items-center justify-between px-6 py-5 sm:px-12 md:px-16 lg:px-40 border-b border-gray-100 bg-gradient-to-b from-gray-200 to-gray-200 backdrop-blur-sm shadow-md sticky top-0 z-50">
      {/* Logo */}
      <Link to="/">
        <img
          src={assets.logo}
          alt="Logo"
          className="w-32 lg:w-36 cursor-pointer"
        />
      </Link>

      {/* Right side */}
      <div className="flex items-center gap-4 sm:gap-6  text-gray-700 font-medium">
        <p className="hidden sm:block">Hi{user ? `, ${user.fullName}` : "!"}</p>

        {user ? (
          <UserButton />
        ) : (
          <img
            src={assets.profile_img}
            alt="Profile"
            className="w-9 h-9 rounded-full shadow-md border border-gray-600"
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
