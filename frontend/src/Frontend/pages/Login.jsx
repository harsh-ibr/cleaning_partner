import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { token, user, login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  //   useEffect(() => {
  //     console.log(token, "token ----");
  //     console.log(user, "user ----");
  //   });
  const [errForm, setErrForm] = useState({});
  const [sucessMsg, setSucessMsg] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrForm({});
    try {
      const response = await axios.post(
        "http://localhost:3000/api/login/",
        formData,
      );

      //   console.log(response.data.token);
      setFormData({
        email: "",
        password: "",
      });
      login(response.data.user, response.data.token);
      navigate("/admin/dashboard");
      //   setSucessMsg(response.data.message);
    } catch (error) {
      if (error.status === 400) {
        const fieldsError = error.response.data.errors;
        fieldsError.map((eRow, index) => {
          const fieldName = eRow.field;
          const fieldValue = eRow.message;
          // console.log(fieldName, fieldValue);
          setErrForm((prev) => ({
            ...prev,
            [fieldName]: fieldValue,
          }));
        });
      }
    }
  };
  return (
    <>
      <section className="min-h-screen w-full grid grid-cols-1 md:grid-cols-6">
        <div className="md:col-span-3 bg-white flex items-center justify-center px-8">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Login Account
            </h2>
            {sucessMsg && (
              <div className="flex items-start justify-between rounded-md bg-green-50 p-4 border border-green-200">
                <p className="text-sm text-green-700">
                  <span className="font-medium">Success!</span> {sucessMsg}
                </p>

                <button
                  onClick={() => setSucessMsg("")}
                  className="ml-4 text-green-700 hover:text-green-900 font-bold"
                >
                  ✕
                </button>
              </div>
            )}
            {/* <p className="text-gray-600 mb-6">Start your journey with us</p> */}

            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {errForm?.email && (
                  <p className="text-red-700"> {errForm?.email} </p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  placeholder="********"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {errForm?.password && (
                  <p className="text-red-700"> {errForm?.password} </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                onClick={handleSubmit}
              >
                Login
              </button>
            </form>

            <p className="text-sm text-gray-600 mt-4 text-center">
              Don’t have an account?
              <Link
                to="/sign-up"
                className="text-blue-600 hover:underline ml-1"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        <div className="md:col-span-3 hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
            alt="Signup"
            className="w-full h-full object-cover"
          />
        </div>
      </section>
    </>
  );
}

export default Login;
