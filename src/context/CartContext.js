import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import axiosInstance from "../utils/axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { token, user, loading } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  const getCartKey = () => (token && user?._id ? `cart_${user._id}` : "cart_guest");


  useEffect(() => {
    if (loading) return;

    const key = getCartKey();
    const savedCart = localStorage.getItem(key);
    setCart(savedCart ? JSON.parse(savedCart) : []);
  }, [loading, token, user?._id]);

  useEffect(() => {
    if (loading || !cart) return;

    const key = getCartKey();
    localStorage.setItem(key, JSON.stringify(cart));
  }, [cart, token, user, loading]);


  useEffect(() => {
    if (loading || !token) return;

    const key = getCartKey();
    const savedCart = localStorage.getItem(key);
    const localCart = savedCart ? JSON.parse(savedCart) : [];

    axiosInstance.get("/cart")
      .then(({ data: serverCarts }) => {

        const serverCartWithProducts = serverCarts.map(item => ({
          ...item.product,
          quantity: item.quantity,
        }));


        const mergedCart = [
          ...serverCartWithProducts,
          ...localCart.filter(
            localItem => !serverCartWithProducts.some(serverItem => serverItem._id === localItem._id)
          ),
        ];

        setCart(mergedCart);
        localStorage.setItem(key, JSON.stringify(mergedCart));
      })
      .catch((err) => {
        console.error("Failed to fetch cart from server:", err);
      });
  }, [token, user?._id, loading]);


  const addToCart = async (productToAdd) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item._id === productToAdd._id);
      if (existing) {
        return prevCart.map(item =>
          item._id === productToAdd._id
            ? { ...item, quantity: item.quantity + (productToAdd.quantity || 1) }
            : item
        );
      } else {
        return [...prevCart, { ...productToAdd, quantity: productToAdd.quantity || 1 }];
      }
    });

    if (token) {
      try {
        await axiosInstance.post("/cart", {
          productId: productToAdd._id,
          quantity: productToAdd.quantity || 1,
        });
      } catch (err) {
        console.error("Error saving cart to server:", err);
      }
    }
  };

  const updateCartQuantity = async (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item => (item._id === id ? { ...item, quantity } : item))
    );

    if (token) {
      try {
        await axiosInstance.put(`/cart/${id}`, { quantity });
      } catch (err) {
        console.error("Error updating cart quantity:", err);
      }
    }
  };


  const removeFromCart = async (id) => {
    setCart(prevCart => prevCart.filter(item => item._id !== id));

    if (token) {
      try {
        await axiosInstance.delete(`/cart/${id}`);
      } catch (err) {
        console.error("Error removing item from cart:", err);
      }
    }
  };


  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};