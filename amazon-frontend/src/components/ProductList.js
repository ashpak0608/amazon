import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for type checking

const Product = ({ product }) => {
  return (
    <div className="product-card">
      <img
        src={product.imageUrl || '/default.jpg'} // Fallback to default image if no product image is provided
        alt={product.name}
        className="product-image"
      />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">${product.price}</p>
      <p className="product-description">{product.description}</p>
    </div>
  );
};

// Define PropTypes for validation
Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
  }).isRequired,
};

const ProductList = ({ products }) => {
  return (
    <div className="product-list">
      {products && products.length > 0 ? (
        products.map((product) => (
          <Product key={product.id} product={product} />
        ))
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

// Define PropTypes for validation
ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      imageUrl: PropTypes.string,
    })
  ).isRequired,
};

export default ProductList;
