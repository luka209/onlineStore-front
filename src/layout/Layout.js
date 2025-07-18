import React, { useContext, useState } from "react";
import { MdFavoriteBorder, MdDelete } from "react-icons/md";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import { LikeContext } from "../context/LikeContext";

import "./layout.css";
import { AuthContext } from "../context/AuthContext";

const Layout = () => {
const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { like } = useContext(LikeContext);
  const { cart, updateCartQuantity,   removeFromCart, getCartTotal } = useContext(CartContext);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo">soltra</Link>

        <div className="wrerp">
          <form
            className="formal"
            style={{ display: "flex", gap: "1rem", alignItems: "center" }}
            onSubmit={handleSearchSubmit}
          >
            <input
              className="second"
              type="search"
              placeholder="Search Products"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
              required
              style={{ padding: "0.5rem", flex: 1 }}
            />
            <button
              type="submit"
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <FaSearch className="fa fa-search" />
            </button>
          </form>
        </div>

        <div className="nav-actions">
          <Link to="/favorite" className="nav-item">
            <div className="icon1"><MdFavoriteBorder /></div>
            <span>Favorites</span>
        <span className="Numbers">
  {like.length}
</span>
          </Link>

          <button onClick={() => setIsCartOpen(true)} className="nav-item">
            <div className="icon1"><FaCartPlus /></div>
            <span>Cart</span>
            <span className="Numbers">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </button>

          <Link to="/profile" className="nav-item">
            <div className="icon1"><BsFillPeopleFill /></div>
<span>{user?.username?.split(" ")[0] || "Sign In"}</span>
          </Link>
        </div>
      </nav>

      {isCartOpen && (
        <>
          <div
            className="cart-sidebar-overlay"
            onClick={() => setIsCartOpen(false)}
          ></div>

          <div className="cart-sidebar">
            <div className="cart-sidebar-content">
              <h2>Cart Sidebar</h2>

              {cart.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <>
                  {cart.map((item) => (
                    <div key={item._id} className="cart-item">
                      <div className="infoss">
                        <img
                          src={item.images?.[0]}
                          className="containerImg"
                          alt={item.title}
                        />
                        <h4>{item.title}</h4>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: {item.price}₾</p>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="delete"
                        >
                          <MdDelete />
                        </button>
                      </div>
                      <div className="gapper">
                        <button
                          onClick={() =>
                            updateCartQuantity(item._id, item.quantity - 1)
                          }
                        >
                          -
                        </button>
                        <button
                          onClick={() =>
                            updateCartQuantity(item._id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                  <p>
                    <strong>Total: {getCartTotal()}₾</strong>
                  </p>
                </>
              )}

              <button
                onClick={() => setIsCartOpen(false)}
                className="close-cart-btn"
              >
                Close
                
              </button>
            </div>
          </div>
          
        </>
      )}
    </>
  );
};

export default Layout;