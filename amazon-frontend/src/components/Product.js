import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  const price = Number(product.price); // Convert to number if it's a string

  return (
    <Link to={`/product/${product._id}`} className="product-link">
      <div className="product-card">
        {/* Ensure correct image path */}
        <img
          src={product.image ? product.image : '/images/default.jpg'} // If no image, use default.jpg
          alt={product.name || 'Product'}
        />
        <h3>{product.name}</h3>
        <Rating rating={product.rating || 0} numRev={product.numRev || 0} />
        <p>${!isNaN(price) ? price.toFixed(2) : '0.00'}</p>
      </div>
    </Link>
  );
};

export default Product;
