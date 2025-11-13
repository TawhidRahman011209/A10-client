import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-green-300 via-green-200 to-green-300 text-green-900 py-8 mt-16 border-t border-green-400">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div>
          <h2 className="text-2xl font-bold text-green-800 mb-2">EcoTrack</h2>
          <p className="text-green-800 text-sm">
            Empowering small actions for a greener future 🌎
          </p>
        </div>

       
        <div>
          <h3 className="text-lg font-semibold mb-2 text-green-800">Explore</h3>
          <ul className="space-y-1">
            <li>
              <Link to="/" className="hover:text-green-700">
                Home
              </Link>
            </li>
            <li>
              <Link to="/challenges" className="hover:text-green-700">
                Challenges
              </Link>
            </li>
            <li>
              <Link to="/activities" className="hover:text-green-700">
                My Activities
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-green-700">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-green-700">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        
        <div>
          <h3 className="text-lg font-semibold mb-2 text-green-800">Connect</h3>
          <div className="flex gap-4 text-2xl text-green-700">
            <a href="#" className="hover:text-green-900">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-green-900">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-green-900">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      
      <div className="mt-8 text-center text-sm text-green-800">
        © {new Date().getFullYear()} <span className="font-semibold">EcoTrack</span>. All rights reserved.
      </div>
    </footer>
  );
}
