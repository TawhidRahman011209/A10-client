import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-green-200 to-green-300 text-green-900 py-6 mt-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 gap-4">
        <div>
          © 2025 <span className="font-semibold text-green-800">EcoTrack</span>
        </div>

        <div className="flex gap-4 text-sm">
          <Link to="/about" className="hover:text-green-800">
            About
          </Link>
          <Link to="/contact" className="hover:text-green-800">
            Contact
          </Link>
        </div>

        <div className="flex gap-4 text-xl">
          <a href="#" className="hover:text-green-700">
            <FaFacebook />
          </a>
          <a href="#" className="hover:text-green-700">
            <FaTwitter />
          </a>
          <a href="#" className="hover:text-green-700">
            <FaInstagram />
          </a>
        </div>
      </div>

      <p className="text-center text-xs mt-4 text-green-800">
        Accessibility & Privacy: built with semantic HTML and alt text.
      </p>
    </footer>
  );
}
