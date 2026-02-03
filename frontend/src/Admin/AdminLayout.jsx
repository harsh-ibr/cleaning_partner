import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { AuthContext } from "../context/AuthContext";

function AdminLayout() {
  const navigate = useNavigate();
  const { token, user } = useContext(AuthContext);
  useEffect(() => {
    if (!token || user.role !== "admin") {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content */}
      <div
        className={`
          transition-all duration-300
          ${isOpen ? "ml-64" : "ml-0"}
          md:ml-64
        `}
      >
        <Navbar setIsOpen={setIsOpen} />
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
