// AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { getCookie, removeCookie, setCookie } from "../utils/cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => getCookie("token") || null);

  const login = (newToken) => {
    setToken(newToken);
    setCookie("token", newToken); // Save token in cookies
  };

  const logout = () => {
    removeCookie("token");
    setToken(null);
  };

  useEffect(() => {
    const storedToken = getCookie("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth };
