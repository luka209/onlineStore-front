import React, { useContext } from 'react';
import { LikeContext } from '../../context/LikeContext';
import { CartContext } from '../../context/CartContext';
  import { Link } from 'react-router-dom';
  import { CiHeart } from 'react-icons/ci';
  import { FaXmark } from "react-icons/fa6";
import './Favorite.css';

const Favorites = () => {
  const { like, removeFromLike } = useContext(LikeContext); 
  const { addToCart } = useContext(CartContext);

  const getFirstImage = (product) => {
    if (Array.isArray(product.images) && product.images.length > 0) {
      return product.images[0];
    }
    return product.image || "/fallback.png";
  };

  return (
    <>
      <h1 className='favorite123'>Favorites</h1>
      <div className="favorites-container">
        {like.length === 0 ? (
          <div className="favoritewrap">
            <CiHeart className="heart" />
            <p className="EMPTY">This wishlist is empty.</p>
            <p className="noproduct">
              You don't have any products in the wishlist yet. You will find a lot of <br />
              interesting products on our "Shop" page.
            </p>
            <Link className="return" to="/">
              Return to shop
            </Link>
          </div>
        ) : (
          <div className="product-grd">
            {like.map((product) => (
              <div key={product._id} className="product-crd">
                <Link className='whoop' to={`/product/${product._id}`}>
                  <img src={getFirstImage(product)} alt={product.name} className="gonnaIMG" />
                  <h3 className='NAME'>{product.name}</h3>
                </Link>

                <p className="stock">ID: {product._id}</p>
                <p className="prces">{product.price}₾</p>

                <button className="CLORICK" onClick={() => addToCart({ ...product, quantity: 1 })}>
                  Add to Cart
                </button>

                <div className='dislike' onClick={() => removeFromLike(product._id)}>
                  <FaXmark />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Favorites;