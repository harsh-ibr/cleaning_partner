import React, { useState, useContext, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Navbar({ setIsOpen }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-40">
      <div className=" px-4">
        <div className="flex justify-between h-16 items-center">
          {/* LEFT – Mobile Hamburger */}
          <div className="flex items-center gap-2">
            <button
              className="md:hidden p-2 rounded hover:bg-gray-100"
              onClick={() => setIsOpen(true)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* <span className="text-xl font-bold text-blue-600">MyLogo</span> */}
          </div>

          {/* CENTER – Desktop Menu */}

          {/* RIGHT – Profile */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 focus:outline-none"
            >
              {/* <img
                src={user?.avatar || "https://i.pravatar.cc/40"}
                alt="profile"
                className="w-9 h-9 rounded-full border"
              /> */}
              <span className="hidden md:block font-medium">
                {user?.name || "Admin"}
              </span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow border">
                <Link className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
