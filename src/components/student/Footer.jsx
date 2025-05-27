import React from "react";
import { assets } from "../../assets/assets";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-gray-900 text-gray-300 px-6 md:px-20 py-4"
    >
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 border-b border-gray-700 pb-10">
        {/* Logo & Paragraph */}
        <div className="flex flex-col gap-4">
          <img src={assets.logo_dark} alt="logo" className="w-40 py-4" />
          <p className="text-sm text-gray-400 max-w-xs ">
            Learn anything, anytime, anywhere with expert-led courses that fit your pace and passion.
          </p>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-base font-semibold text-white mb-3">Company</h3>
          <ul className="space-y-5 text-sm text-gray-400">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">About Us</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* More - hidden on small screens */}
        <div className="hidden lg:block">
          <h3 className="text-base font-semibold text-white mb-3">More</h3>
          <ul className="space-y-5 text-sm text-gray-400">
            <li className="hover:text-white cursor-pointer">Careers</li>
            <li className="hover:text-white cursor-pointer">Blog</li>
            <li className="hover:text-white cursor-pointer">Help Center</li>
            <li className="hover:text-white cursor-pointer">Affiliate</li>
          </ul>
        </div>

        {/* Newsletter - hidden on small screens */}
        <div className="hidden lg:flex flex-col gap-4">
          <h3 className="text-base font-semibold text-white">Newsletter</h3>
          <p className="text-sm text-gray-400">
            Get the latest updates, articles, and resources delivered weekly.
          </p>
          <form className="flex flex-col gap-3 w-full">
            <input
              type="email"
              placeholder="Enter Your email"
              className="px-3 py-2 rounded-lg bg-gray-800 text-sm text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500"
            />
            <button
              type="submit"
              className="px-4 py-2 text-sm font-semibold bg-white text-gray-900 rounded-lg hover:bg-gray-200 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-4 flex items-center justify-center text-center text-[14px] text-gray-500">
  © 2025 C Morewords. All Rights Reserved.
</div>

    </motion.footer>
  );
};

export default Footer;



