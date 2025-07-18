import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axios"; 

export const AuthContext = createContext();

let logoutExternal = () => {};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const userJson = localStorage.getItem("user");
    return userJson ? JSON.parse(userJson) : null;
  });
  const [loading, setLoading] = useState(true);

  const getCartKey = () => (token && user?._id ? `cart_${user._id}` : "cart_guest");

  useEffect(() => {
    if (loading) {
      setLoading(false);
    }

    if (!token) return;

    const key = getCartKey();
    const savedCart = localStorage.getItem(key);

 

    axiosInstance
      .get("/cart")
      .then(({ data: serverCarts }) => {
        const serverCartWithProducts = serverCarts.map((item) => ({
          ...item.product,
          quantity: item.quantity,
        }));

        const mergedCart = [
          ...serverCartWithProducts,
          ...((savedCart ? JSON.parse(savedCart) : []).filter(
            (localItem) =>
              !serverCartWithProducts.some((serverItem) => serverItem._id === localItem._id)
          )),
        ];

        localStorage.setItem(key, JSON.stringify(mergedCart));
 
      })
      .catch((err) => console.error("Cart fetch error:", err));
  }, [token, user?._id, loading]);

  const login = (newToken, userData) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  logoutExternal = logout;

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const triggerLogout = () => logoutExternal();