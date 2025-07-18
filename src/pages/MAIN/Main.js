import React, { useState, useEffect, useContext } from "react";
import soltraLogo from "../../images/logo-transparent.png";
import "./Main.css";
import { CartContext } from "../../context/CartContext";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LikeContext } from "../../context/LikeContext";
import HeroSlider from "../../components/HeroSlider";
import { categories } from "../../data/categoriesData";
import ball from "../../images/ball.svg";

function Main() {
  const navigate = useNavigate();
  const [productList, setProductList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(10);
  const { categoryName } = useParams();
  const { addToCart } = useContext(CartContext);
  const { addToLike, isLiked, message } = useContext(LikeContext);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/images")
      .then((res) => {
        setProductList(res.data);
        setFilteredProducts(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const getFirstImage = (product) => {
    if (Array.isArray(product.images) && product.images.length > 0) {
      return product.images[0];
    }
    return product.image || "/fallback.png";
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setToast(`${product.name} დამატებულია კალათაში!`);
    setTimeout(() => setToast(""), 3000);
  };

  return (
    <div className="soltra">
      <HeroSlider />

      <section className="products-section" id="products">
        <p className="offers">Best Offers</p>

        <div className="products-grid">
          {loading ? (
            <p className="loader"></p>
          ) : filteredProducts.length === 0 ? (
            <div className="founding">
              <p className="haventfound">
                Matching product for your selection could not be found.
              </p>
            </div>
          ) : (
            filteredProducts.slice(0, 5).map((product) => (
              <div key={product._id} className="product-card">
                <Link to={`/product/${product._id}`}>
                  <img
                    src={getFirstImage(product)}
                    alt={product.name}
                    className="product-image"
                  />
                </Link>
                <div className="left">
                  <h2>{product.name}</h2>
                  {product.stock > 0 ? "In stock" : "Not in stock"}
                  <p className="price">{product.price}₾</p>
                  <button
                    onClick={() => addToLike(product)}
                    className={`favorite-icon ${isLiked(product._id) ? "liked" : ""}`}
                  >
                    <CiHeart />
                  </button>
                </div>

                <button
                  className="CLICK"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            ))
          )}
        </div>
        {toast && <div className="add-to-cart-message">{toast}</div>}
        {message && <div className="add-to-cart-message">{message}</div>}
      </section>

      <section className="technic-service">
        <div className="TECHNIC-SERVICE">
          <h1>Technical service</h1>
          <Link className="TechnicalLink" to="/technicService">
            Learn more <span className="arrow-hover"><FaArrowRight /></span>
          </Link>
        </div>
      </section>

      <section className="importantconfiguration">
        <div className="WRAPPPPP">
          <div className="computerComponents">
            <h1>
              Computer
              <br /> Components
            </h1>
            <div className="background-container">
              <div className="floating-bg"></div>
              <img className="ball" src={ball} alt="ball" />
            </div>

            {(() => {
              const chunkSize = 3;
              const chunks = [];
              const subItems = categories[2].subItems || [];

              for (let i = 0; i < subItems.length; i += chunkSize) {
                chunks.push(subItems.slice(i, i + chunkSize));
              }

              return chunks.map((chunk, index) => (
                <div key={index} className="rowhero">
                  {chunk.map((sub, subIndex) => (
                    <Link
                      key={subIndex}
                      to={`/category/${encodeURIComponent(sub)}`}
                      className="partofpc"
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              ));
            })()}

            <Link
              to={`/category/${encodeURIComponent(categories[2].label)}`}
              className="categoryLink"
            >
              Explore Category <span className="arrow-hover"><FaArrowRight /></span>
            </Link>
          </div>

          <div className="cameraSystem">
            <h1 className="cameraH1">
              Camera <br /> Systems
            </h1>

            <div className="wrolex">
              <Link
                className="basiclink snickers"
                to="/category/Surveillance%20Cameras"
              >
                Surveillance Cameras
              </Link>
              <Link
                className="basiclink snickers"
                to="/category/Video%20Recorders"
              >
                Video Recorders
              </Link>
            </div>

            <Link
              className="basiclink"
              to="/category/Surveillance%20System%20Accessories"
              style={{ width: "250px", marginTop: "15px" }}
            >
              Surveillance System Accessories
            </Link>
            <img
              src={require("../../images/video_control (1).png")}
              alt="Surveillance"
            />
            <Link
              to={`/category/${encodeURIComponent(categories[2].label)}`}
              className="categoryLink"
              style={{ margin: 0, backgroundColor: "#f2f2f2" }}
            >
              Explore Category <span className="arrow-hover"><FaArrowRight /></span>
            </Link>
          </div>
        </div>

        <div className="wrapbasic23">
          <div className="boxbasic135">
            <div className="WROPPER">
              <div className="left-box-content">
                <h1 className="NoteBooks">Notebooks</h1>
                <Link
                  to={`/category/${encodeURIComponent(categories[2].label)}`}
                  className="categoryLink"
                  style={{ margin: 0, backgroundColor: "#f2f2f2" }}
                >
                  Explore Category <span className="arrow-hover"><FaArrowRight /></span>
                </Link>
              </div>
              <img
    src={require("../../images/computer.png")}
                alt="Notebook"
         
              />
            </div>
          </div>

          <div className="boxbasic1235">
            <div className="WROPPER">
              <div className="left-box-content">
                <h1 className="NoteBooks">Printers</h1>
                <Link
                  to={`/category/${encodeURIComponent(categories[2].label)}`}
                  className="categoryLink"
                  style={{ margin: 0, backgroundColor: "#f2f2f2" }}
                >
                  Explore Category <span className="arrow-hover"><FaArrowRight /></span>
                </Link>
              </div>
              <img
                src={require("../../images//printer1.png")}
                alt="Printer"
       
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Main;  