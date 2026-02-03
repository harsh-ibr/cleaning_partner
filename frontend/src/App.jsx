import { useState } from "react";
import Layout from "./Frontend/Layout";
import AdminLayout from "./Admin/AdminLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Frontend/pages/Home";
import Signup from "./Frontend/Pages/Signup";
import Login from "./Frontend/pages/Login";
import Dashboard from "./Admin/pages/Dashboard";
import categoryRoutes from "./Admin/routes/categoryRoutes.jsx";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" exect element={<Home />} />
            <Route path="/sign-up" exect element={<Signup />} />
            <Route path="/login" exect element={<Login />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" exect element={<Dashboard />} />
            {categoryRoutes}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
