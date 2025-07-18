import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductPage.css";
import { CiHeart } from "react-icons/ci";
import { LikeContext } from "../../context/LikeContext";
import { CartContext } from "../../context/CartContext";

const ProductPage = () => {
  const { id } = useParams();
  const { like, addToLike, isLiked } = useContext(LikeContext);
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [userRating, setUserRating] = useState(null);
  const [displayedRating, setDisplayedRating] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [hoveredStar, setHoveredStar] = useState(null);
  const navigate = useNavigate();


  function getUserIdFromToken() {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.id || payload._id || null;
    } catch {
      return null;
    }
  }


const uniqueUsersCount = () => {
  if (!product || !product.ratings) return 0;
  const uniqueUserIds = new Set(product.ratings.map((r) => String(r.userId)));
  return uniqueUserIds.size;
};

  const calculateAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;
    const total = ratings.reduce((sum, rating) => sum + (rating.value || 0), 0);
    return total / ratings.length;
  };


  const getFirstImage = (product) => {
    if (product.images && Array.isArray(product.images) && product.images.length > 0) {
      return product.images[0];
    }
    if (product.image) return product.image;
    return "/";
  };

  const renderAverageStars = () => {
    const stars = [];
    const roundedRating = Math.round(displayedRating);

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          style={{ color: i <= roundedRating ? "#f5c518" : "#ccc", fontSize: "20px" }}
          aria-label={i <= roundedRating ? "Filled star" : "Empty star"}
        >
          {i <= roundedRating ? "★" : "☆"}
        </span>
      );
    }
    return stars;
  };

useEffect(() => {
  setLoading(true);
  axios
    .get(`http://localhost:5000/api/images/${id}`)
    .then((res) => {
      setProduct(res.data);
      setDisplayedRating(calculateAverageRating(res.data.ratings));

      const savedRating = localStorage.getItem(`rating_${id}`);
      if (savedRating) {

        setUserRating(parseInt(savedRating, 10));
      } else {
      
        const userId = getUserIdFromToken();
        if (userId) {
          const userRatingObj = res.data.ratings.find(
            (r) => String(r.userId) === String(userId)
          );
          if (userRatingObj) setUserRating(userRatingObj.value);
          else setUserRating(null);
        } else {
          setUserRating(null);
        }
      }
    })
    .catch((err) => console.error("Error loading product:", err))
    .finally(() => setLoading(false));
}, [id]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/related/${id}`)
      .then((res) => setRelatedProducts(res.data))
      .catch((err) => console.error("Failed to fetch related products:", err));
  }, [id]);


  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    e.target.style.backgroundPosition = `${x}% ${y}%`;
    e.target.style.backgroundSize = "200%";
  };

  const handleMouseLeave = (e) => {
    e.target.style.backgroundPosition = "center";
    e.target.style.backgroundSize = "100%";
  };


  const handleQuantityChange = (amount) => {
    setSelectedQuantity((prev) => {
      const newQty = prev + amount;
      if (newQty < 1) return 1;
      if (product.stock && newQty > product.stock) return product.stock;
      return newQty;
    });
  };

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: selectedQuantity });
  };


  const handleLikeClick = (product) => addToLike(product);


  const handleStarClick = (ratingValue) => {
    if (!product) return;
    const userId = getUserIdFromToken();
    if (!userId) {
      alert("Please login to rate.");
      return;
    }

    setUserRating(ratingValue);
    localStorage.setItem(`rating_${product._id}`, ratingValue);

    axios
      .post(
        `http://localhost:5000/api/rate/rate/${product._id}`,
        { rating: ratingValue },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res.data.averageRating) {
          setDisplayedRating(res.data.averageRating);
        }
        const currentUserId = res.data.userId;  

       setProduct((prevProduct) => {
  const filteredRatings = prevProduct.ratings.filter(
    (r) => String(r.userId) !== String(currentUserId)
  );
  const updatedRatings = [
    ...filteredRatings,
    { _id: res.data.ratingId, userId: currentUserId, value: ratingValue },
  ];
  return {
    ...prevProduct,
    ratings: updatedRatings,
  };
});
  })  .catch((err) => {
        console.error("Failed to submit rating:", err);
      });
  };

  if (loading)
    return (
      <div className="loading-overlay">
        <div className="loading-text">Loading...</div>
      </div>
    );

  if (!product || !product.images) return <div>Product not found</div>;

  return (
    <div className="product-detail-page">
      <nav className="breadcrumb">
        <Link className="mainsite" to="/">
          Main
        </Link>{" "}
        &gt;{" "}
        <Link className="categoryofsite" to={`/category/${encodeURIComponent(product.category)}`}>
          {product.category}
        </Link>{" "}
        &gt; <span>{product.brand}</span>
      </nav>

      <div className="contained">
        <div className="zoom-container">
          <div
            key={activeImageIndex}
            className="zoom-image slide-animation"
            style={{ backgroundImage: `url(${product.images[activeImageIndex]})` }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          ></div>

          <div className="image-thumbnails">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                className={`thumb ${index === activeImageIndex ? "active" : ""}`}
                onClick={() => setActiveImageIndex(index)}
                alt={`thumb-${index}`}
              />
            ))}
          </div>

          {product.images.length > 1 && (
  <div className="image-nav">
    <button
      className="image-nav-button prev"
      onClick={() =>
        setActiveImageIndex((prev) =>
          prev === 0 ? product.images.length - 1 : prev - 1
        )
      }
    >
      ←
    </button>
    <button
      className="image-nav-button next"
      onClick={() =>
        setActiveImageIndex((prev) =>
          prev === product.images.length - 1 ? 0 : prev + 1
        )
      }
    >
      →
    </button>
  </div>
)}
        </div>

        <div className="informationofproduct">
          <h2 className="productname">{product.name}</h2>

          <div style={{ display: "flex", gap: "4px" }}>
            {Array.from({ length: 5 }).map((_, i) => {
              const starIndex = i + 1;
              const isFilled = hoveredStar
                ? starIndex <= hoveredStar
                : userRating
                ? starIndex <= userRating
                : false;
              return (
                <span
                  key={i}
                  onClick={() => handleStarClick(starIndex)}
                  onMouseEnter={() => setHoveredStar(starIndex)}
                  onMouseLeave={() => setHoveredStar(null)}
                  style={{
                    cursor: "pointer",
                    fontSize: "24px",   
                    color: isFilled ? "#f5c518" : "#ccc",
                    userSelect: "none",
                  }}
                  tabIndex={-1}
                  aria-label={`${starIndex} star`}
                >
                  ★
                </span>
              );
            })}
          </div>

          <div
            style={{ display: "inline-flex", alignItems: "center", gap: "4px", marginLeft: "12px" }}
          >
            {renderAverageStars()}
         <span style={{ fontSize: "14px", color: "#333", marginLeft: "8px" }}>
  ({uniqueUsersCount()} ratings )
</span>
          </div>

          <h2>Local Information</h2>
          <p>
            Type: <br /> {product.category}
          </p>
          <p>
            In stock: <br /> {product.stock > 0 ? "Yes" : "No"}
          </p>
          <p>
            Brand: <br /> {product.brand}
          </p>
          <span className="prices">{product.price}₾</span>

          <div className="quantity-selector">
            <button className="positive" onClick={() => handleQuantityChange(-1)}>
              -
            </button>
            <span>{selectedQuantity}</span>
            <button className="negative" onClick={() => handleQuantityChange(1)}>
              +
            </button>
          </div>

          <div className="wrw">
            <Link to="/payment">
              <button className="buying">Buy</button>
            </Link>
            <button className="CLCK" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {product.desc && (
        <div className="product-specs">
          <h3 className="specs-heading">Description</h3>

          <h4 className="specs-section-title">Screen</h4>
          <ul className="specs-list">
            <li>Diagonal: {product.desc.screen.diagonal}</li>
            <li>Resolution: {product.desc.screen.resolution}</li>
            <li>Screen Type: {product.desc.screen.panelType}</li>
            <li>Format: {product.desc.screen.screenFormat}</li>
            <li>Lighting: {product.desc.screen.lighting}</li>
            <li>Refresh Rate: {product.desc.screen.refreshRateHz} Hz</li>
          </ul>

          <h4 className="specs-section-title">Processor</h4>
          <ul className="specs-list">
            <li>Manufacturer: {product.desc.processor.manufacturer}</li>
            <li>Chipset Type: {product.desc.processor.chipsetType}</li>
            <li>Model: {product.desc.processor.model}</li>
            <li>
              Cores: {product.desc.processor.cores}, Threads: {product.desc.processor.threads}
            </li>
            <li>Lithography: {product.desc.processor.lithography}</li>
            <li>Cache: {product.desc.processor.cache}</li>
            <li>Max Speed: {product.desc.processor.maxSpeedGHz} GHz</li>
            <li>Graphics: {product.desc.processor.gpuModel}</li>
          </ul>

          <h4 className="specs-section-title">Memory</h4>
          <ul className="specs-list">
            <li>
              RAM: {product.desc.memory.ramSizeGB} GB {product.desc.memory.ramType}
            </li>
            <li>
              SSD: {product.desc.memory.ssdSizeGB} GB {product.desc.memory.ssdInterface}
            </li>
          </ul>

          <h4 className="specs-section-title">Webcam and Sound</h4>
          <ul className="specs-list">
            <li>Webcam: {product.desc.webcam.hasWebcam ? product.desc.webcam.resolution : "No"}</li>
            <li>
              Stereo Sound: {product.desc.sound.stereoSound ? "Yes" : "No"}, Speakers:{" "}
              {product.desc.sound.speakersCount}
            </li>
            <li>Microphone: {product.desc.sound.hasMicrophone ? "Yes" : "No"}</li>
          </ul>

          <h4 className="specs-section-title">Interfaces</h4>
          <ul className="specs-list">
            <li>HDMI: {product.desc.interface.hdmi}</li>
            <li>USB 3.2: {product.desc.interface.usb32}</li>
            <li>3.5mm Audio Jack: {product.desc.interface.audioJack35mm}</li>
          </ul>

          <h4 className="specs-section-title">Connectivity</h4>
          <ul className="specs-list">
            <li>Wi-Fi: {product.desc.connectivity.wifi}</li>
            <li>Bluetooth: {product.desc.connectivity.bluetooth}</li>
          </ul>

          <h4 className="specs-section-title">Battery</h4>
          <ul className="specs-list">
            <li>{product.desc.battery.description}</li>
          </ul>

          <h4 className="specs-section-title">Other Features</h4>
          <ul className="specs-list">
            <li>Color: {product.desc.color.color}</li>
            <li>
              Dimensions: {product.desc.dimensions.heightCm} x {product.desc.dimensions.widthCm} x{" "}
              {product.desc.dimensions.depthCm} cm
            </li>
            <li>Weight: {product.desc.weight.weightKg} kg</li>
            <li>Warranty: {product.desc.warranty.warrantyMonths} months</li>
            <li>Operating System: {product.desc.os.os}</li>
          </ul>
        </div>
      )}

      {relatedProducts.length > 0 && (
        <div className="related-products-section">
          <h3 className="specs-heading">Related Products</h3>
          <div className="related-products-grid">
            {relatedProducts
              .filter((relatedProduct) => relatedProduct._id !== product._id)
              .map((relatedProduct) => (
                <Link
                  to={`/product/${relatedProduct._id}`}
                  className="related-product-card"
                  key={relatedProduct._id}
                >
                  <div className="product-card">
                    <img
                      src={getFirstImage(relatedProduct)}
                      alt={relatedProduct.name}
                      className="product-image"
                    />
                    <div className="left">
                      <h2>{relatedProduct.name}</h2>
                      <p className="stock">in stock: {relatedProduct.stock}</p>
                      <p className="price">{relatedProduct.price}₾</p>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleLikeClick(relatedProduct);
                        }}
                        className={`favorite-icon ${isLiked(relatedProduct._id) ? "liked" : ""}`}
                      >
                        <CiHeart />
                      </button>
                    </div>
                    <button
                      className="CLICK"
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart({ ...relatedProduct, quantity: 1 });
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;