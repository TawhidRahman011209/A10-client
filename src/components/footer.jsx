import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-base-100 text-base-content py-6 mt-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 gap-4">
        <div>© 2025 <span className="font-semibold text-primary">EcoTrack</span></div>

        <div className="flex gap-4 text-sm">
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
        </div>

        <div className="flex gap-4 text-xl">
          <a href="#"><FaFacebook /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaInstagram /></a>
        </div>
      </div>

      <p className="text-center text-xs mt-4 text-gray-500">
        Accessibility & Privacy: built with semantic HTML and alt text.
      </p>
    </footer>
  );
}
