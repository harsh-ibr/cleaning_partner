import { createContext, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [user, setUser] = useState(
    Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
  );
  const [alert, setAlert] = useState({
    color: "",
    message: "",
  });

  const login = (userData, token) => {
    Cookies.set("user", JSON.stringify(userData));
    Cookies.set("token", token);
    setUser(userData);
    setToken(token);
  };

  const logout = () => {
    Cookies.remove("user");
    Cookies.remove("token");
    setUser(null);
    setToken(null);
  };

  const notification = (color, message) => {
    setAlert({
      color: color,
      message: message,
    });
  };

  return (
    <AuthContext.Provider
      value={{ alert, user, token, login, logout, notification }}
    >
      {children}
    </AuthContext.Provider>
  );
};
