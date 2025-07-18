import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import axiosInstance from "../utils/axios";

const LikeContext = createContext();

function LikeProvider({ children }) {
  const { token, loading } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [like, setLike] = useState(() => {
    const savedLike = localStorage.getItem("like");
    return savedLike ? JSON.parse(savedLike) : [];
  });

  useEffect(() => {
    localStorage.setItem("like", JSON.stringify(like));
  }, [like]);

  useEffect(() => {
    if (loading) return;

    if (token) {
      axiosInstance.get("/like")
        .then(({ data: serverLikes }) => {
          const localLikes = [...like];
          const mergedLikes = [
            ...serverLikes,
            ...localLikes.filter(
              localItem => !serverLikes.some(serverItem => serverItem._id === localItem._id)
            ),
          ];
          setLike(mergedLikes);
          setLike(serverLikes);
          localStorage.setItem("like", JSON.stringify(serverLikes));
        })
        .catch((err) => {
          console.error("Failed to fetch likes from server:", err);
        });
    } else {
      setLike([]);
      localStorage.removeItem("like");
    }
  }, [token, loading]);

  const addToLike = async (productToAdd) => {
    try {
      await axiosInstance.post("/like", productToAdd);

      setLike((prevLike) => {
        const isAlreadyLiked = prevLike.some((item) => item._id === productToAdd._id);
        if (isAlreadyLiked) {
          setMessage(`Product ${productToAdd.name} removed from favorites`);
          return prevLike.filter((item) => item._id !== productToAdd._id);
        } else {
          setMessage(`Product ${productToAdd.name} added to favorites`);
          return [...prevLike, { ...productToAdd, quantity: 1 }];
        }
      });

      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Failed to add like", error.response || error.message || error);
      setMessage(`Please register first to like product :)`);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const clearLikes = () => {
    setLike([]);
    localStorage.removeItem("like");
  };

  const removeFromLike = (id) => {
    setLike((prev) => prev.filter((item) => item._id !== id));
  };

  const isLiked = (id) => {
    return like.some((item) => item._id === id);
  };

  if (loading) return null;

  return (
    <LikeContext.Provider
      value={{ clearLikes, like, addToLike, removeFromLike, isLiked, message }}
    >
      {children}
    </LikeContext.Provider>
  );
}

export { LikeContext, LikeProvider };