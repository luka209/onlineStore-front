import React, { useState, useEffect, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import "./Search.css";
import { CiHeart } from "react-icons/ci";
import { LikeContext } from "../../context/LikeContext";
import { CartContext } from "../../context/CartContext";

const SearchPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") || "";
  const [showClick, setShowClick] = useState(null)
  const [productList, setProductList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("lowToHigh");
  const [visibleCount, setVisibleCount] = useState(10);
const [toast, setToast] = useState("");
  const { addToLike, isLiked } = useContext(LikeContext);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/products/search?q=${encodeURIComponent(query)}`)
      .then((res) => {
        setProductList(res.data);
      })
      .catch((err) => {
        console.error("Search failed:", err);
        setProductList([]);
      })
      .finally(() => setLoading(false));
  }, [query]);

  useEffect(() => {
    const sorted = [...productList].sort((a, b) =>
      sortOrder === "lowToHigh" ? a.price - b.price : b.price - a.price
    );
    setFilteredProducts(sorted);
  }, [productList, sortOrder]);

const handleAddToCart = (product) => {
  addToCart(product);
  setToast(`${product.name} დამატებულია კალათაში!`);
  setTimeout(() => setToast(""), 3000);
};

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2 className="query">searching up "{query}"</h2>

      <div style={{ margin: "1rem 0", borderRadius: "5px" }}>
        <select
          style={{ margin: "100px", padding: "10px" }}
          className="sort-select"
          id="sortOrder"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="lowToHigh">From low to high</option>
          <option value="highToLow">From high to low</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filteredProducts.length === 0 ? (
        <p style={{ color: "red", fontWeight: "bold" }}>No products found</p>
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))",
              gap: "1rem",
             
            }}
          >
            {filteredProducts.slice(0, visibleCount).map((product) => (
              <div key={product._id} className="prdct"  onMouseEnter={() => setShowClick(product._id)}
                                                        onMouseLeave={() => setShowClick(null)}
              >
                <Link to={`/product/${product._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <img
                    src={product.images?.[0] || ""}
                    alt={product.name}
                    style={{marginTop: "18px", width: "328px", height: "200px", objectFit: "contain" }}
                  />
                  <h3 className="title" style={{ marginTop: "40px", fontWeight: "bold" }}>{product.name}</h3>
 
                  <p className="product-price" style={{ marginTop: "50px", fontWeight: "bold" }}>
                    {product.price}₾
                  </p>
                  
              
                </Link>
 {showClick === product._id && <button className="CK" style={{position: "absolute", bottom: ".9px" }}  onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </button>}
 
              </div>
            ))}
          </div>
{toast && (
  <div className="add-to-cart-message">
    {toast}
  </div>
)}
          {visibleCount < filteredProducts.length && (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <button onClick={handleSeeMore} className="see-more-btn">
                See More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchPage;