import React, { useState } from "react";
import { CiHeart } from "react-icons/ci";

const ProductCard = ({ product, onAddToCart }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [buttonText, setButtonText] = useState("Add to cart");
  const [buttonStyle, setButtonStyle] = useState({ background: "#007bff", color: "#fff" });
ც
  const images = product.images && product.images.length > 0
    ? product.images
    : [product.image || "/fallback.png"];

  const handleAddToCart = () => {
    onAddToCart();
    setButtonText("Added ✓");
    setButtonStyle({ background: "#28a745", color: "#fff" });
    setTimeout(() => {
      setButtonText("Add to cart");
      setButtonStyle({ background: "#007bff", color: "#fff" });
    }, 2000);
  };

  return (
    <div className="product-card fade-in-up" role="region" aria-label={`Product: ${product.title}`}>
      <div className="product-images">
        <img
          src={images[0]}
          alt={product.title}
          style={{ width: "100%", height: "auto", objectFit: "cover" }}
          loading="lazy"
        />
      </div>

      <h3 className="product-title">{product.title}</h3>
      <div className="product-price">{product.price}₾</div>
      <div className="product-category">{product.category}</div>
      <div className="product-stock" aria-live="polite">  
        {product.stock > 0 ? "In stock" : "Not in stock"}
      </div>

      <div className="adds">
        <button
          className="add-to-cart"
          style={buttonStyle}
          onClick={handleAddToCart}
          aria-pressed={buttonText === "Added ✓"}
        >
          {buttonText}
        </button>{" "}
        <button
          className={`favorite-btn ${isFavorite ? "active" : ""}`}
          onClick={() => setIsFavorite(!isFavorite)}
          aria-pressed={isFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          type="button"
        >
          <div className={`favorite-icon ${isFavorite ? "filled" : ""}`}>
            <CiHeart />
          </div>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;