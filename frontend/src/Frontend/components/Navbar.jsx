import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className="bg-white shadow sticky top-0">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            <div className="text-xl font-bold text-blue-600">MyLogo</div>

            <div className="space-x-6 hidden md:flex">
              <a href="#" className="text-gray-700 hover:text-blue-600">
                Home
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600">
                About
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600">
                Services
              </a>
              <a href="#" className="text-gray-700 hover:text-blue-600">
                Contact
              </a>
            </div>

            <div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Login
              </button>
              <Link
                to="/sign-up"
                className="bg-yellow-300 text-black px-4 py-2 rounded hover:bg-yellow-200 ms-2"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
