import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./CategoryPage.css";
import { FaExclamationTriangle } from "react-icons/fa";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const decodedCategoryName = decodeURIComponent(categoryName);

  const [productList, setProductList] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("low-to-high");    
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    console.log("Fetching products for category:", decodedCategoryName);

    axios
      .get(`http://localhost:5000/api/products/category/${decodedCategoryName}`)
      .then((res) => {
        console.log("Products fetched:", res.data);
        setProductList(res.data);
      })
      .catch((err) => {
        console.error("Error loading products:", err);
        setProductList([]);
        setError("Failed to load products.");
      })
      .finally(() => setLoading(false));
  }, [decodedCategoryName]);

  useEffect(() => {
    let sorted = [...productList];
    if (sortOrder === "high-to-low") {
      sorted.sort((a, b) => b.price - a.price);
    } else {
      sorted.sort((a, b) => a.price - b.price);
    }
    setSortedProducts(sorted);
  }, [productList, sortOrder]);

  const getFirstImage = (product) => {
    if (product.images?.length > 0) return product.images[0];
    if (product.image) return product.image;
    return "/";
  };

  return (
    <div className="category-page">
      <h1
        style={{ marginTop: "13vh", color: "#000070", fontFamily: "sans-serif" }}
        className="category-title"
      >
        {decodedCategoryName}
      </h1>

      <select
        className="sort-select"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        style={{ marginBottom: "2rem", padding: "0.5rem", marginTop: "30px" }}
      >
        <option value="low-to-high">From Low Price to High</option>
        <option value="high-to-low">From High Price to Low</option>
      </select>

      {loading ? (
        <p className="loader"></p>
      ) : error ? (
        <p className="no-products" style={{ color: "red" }}>
          {error} <FaExclamationTriangle />
        </p>
      ) : sortedProducts.length === 0 ? (
        <p className="no-products">
          No products found for this category. <FaExclamationTriangle />
        </p>
      ) : (
        <div
          className="products-grd"
          style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          }}
        >
          {sortedProducts.map((product) => (
            <div
              key={product._id}
              className="product-card"
              style={{
                border: "1px solid #ddd",
                borderRadius: "4px",
                padding: "1rem",
                justifyContent: "space-between",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Link to={`/product/${product._id}`}>
                <img
                  src={getFirstImage(product)}
                  alt={product.name}
                  className="product-image"
                  style={{ width: "100%", height: "150px", objectFit: "contain" }}
                />
              </Link>
              <div className="product-info" style={{ marginTop: "0.5rem" }}>
                <h4 style={{ fontSize: "1rem", margin: "0 0 0.3rem 0" }}>
                  {product.name}
                </h4>
                <p className="stock" style={{ margin: "0 0 0.3rem 0", color: "#555" }}>
                  {product.stock > 0 ? "In stock" : "Not in stock"}
                </p>
                <p className="price" style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                  {product.price}₾
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
