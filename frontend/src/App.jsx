import { useState } from "react";
import Layout from "./Frontend/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Frontend/pages/Home";
import Signup from "./Frontend/Pages/Signup";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" exect element={<Home />} />
            <Route path="/sign-up" exect element={<Signup />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
