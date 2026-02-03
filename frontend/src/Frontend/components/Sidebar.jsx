import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar({ isOpen, setIsOpen }) {
  const linkClass =
    "block px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700";

  const activeClass = "bg-gray-700 text-white";

  return (
    <>
      {/* Overlay (mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-64 bg-gray-900
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-gray-900 border-b border-gray-700">
          <span className="text-xl font-bold text-white">Admin Panel</span>

          {/* Close (mobile) */}
          <button
            className="md:hidden p-2 rounded hover:bg-gray-800"
            onClick={() => setIsOpen(false)}
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Scrollable Menu */}
        <div className="overflow-y-auto h-[calc(100vh-64px)]">
          <nav className="mt-4 space-y-1 px-2">
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeClass : ""}`
              }
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </NavLink>

            {/* Example extra items */}
            <NavLink to="#" className={linkClass}>
              Users
            </NavLink>
            <NavLink to="#" className={linkClass}>
              Settings
            </NavLink>
            <NavLink to="#" className={linkClass}>
              Reports
            </NavLink>
          </nav>
        </div>

        {/* Sticky Logout Bottom */}
        <div className="sticky bottom-0 bg-gray-900 border-t border-gray-700 p-4">
          <button className="w-full px-4 py-2 rounded-lg text-red-400 hover:bg-gray-800">
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
