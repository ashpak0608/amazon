import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Rating from '../components/Rating';
import '../styles/ProductPage.css';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { detailsProduct } from '../actions/ProdcutActions';

const ProductPage = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const productID = props.match.params.id;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const [qty, setQty] = useState(1);

  useEffect(() => {
    dispatch(detailsProduct(productID));
  }, [dispatch, productID]);

  const addToCartHandler = () => {
    history.push(`/cart/${productID}?qty=${qty}`);
  };

  return (
    <div className="product-container">
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <button onClick={() => history.goBack()} className="back-button">
            Back to Results
          </button>
          <div className="product-details-grid">
            <div className="image-section">
              <img
                src={product.image || 'default.jpg'}
                alt={product.name || 'Product'}
                className="large"
              />
            </div>
            <div className="details-section">
              <h1 className="product-name">{product.name}</h1>
              <Rating rating={product.rating} numRev={product.numRev} />
              <p className="product-description">{product.description}</p>
              <div className="price">${product.price}</div>
            </div>
            <div className="action-section">
              <div className="card card-body">
                <ul>
                  <li>
                    <p>Total Amount:</p>
                    <div className="price">${(product.price * qty).toFixed(2)}</div>
                  </li>
                  <li>
                    <p>Stock:</p>
                    {product.stock > 10 ? (
                      <span className="success">In Stock</span>
                    ) : product.stock > 0 ? (
                      <span className="warning">Hurry! Few in Stock</span>
                    ) : (
                      <span className="error">Out of Stock</span>
                    )}
                  </li>
                  {product.stock > 0 && (
                    <>
                      <li>
                        <p>Qty:</p>
                        <div className="qty-select">
                          <select
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(product.stock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </select>
                        </div>
                      </li>
                      <li>
                        <button
                          className="add-to-cart"
                          onClick={addToCartHandler}
                        >
                          Add to Cart
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductPage;
