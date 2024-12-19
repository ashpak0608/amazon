import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/CartAction';
import { Link } from 'react-router-dom';
import MessageBox from "../components/MessageBox";
import "../styles/Cart.css";
import CancelIcon from '@material-ui/icons/Cancel';

const Cart = (props) => {
    const productID = props.match.params.id;  // Get product ID from URL params
    const qty = props.location.search ? 
        Number(props.location.search.split('=')[1])  // Extract quantity from URL
        : 1;  // Default quantity to 1 if not provided

    const cart = useSelector((state) => state.cart);
    const { cartItems, error } = cart;

    const dispatch = useDispatch();

    useEffect(() => {
        if (productID) {
            dispatch(addToCart(productID, qty));  // Dispatch addToCart if productID exists
        }
    }, [dispatch, productID, qty]);  // Re-run effect when productID or qty changes

    const removeProduct = (id) => {
        dispatch(removeFromCart(id));  // Dispatch remove product from cart
    };

    const checkOut = () => {
        props.history.push('/shipping');  // Navigate to shipping page
    };

    return (
        <div>
            <Link to="/" className="back-res">Back to home</Link>

            <div className="row-container">
                <div className="col-4">
                    <h1>Shopping Cart</h1>
                    {cartItems.length === 0 ? (
                        <MessageBox>
                            Cart is empty. <Link to="/">Go Shopping</Link>
                        </MessageBox>
                    ) : (
                        <ul>
                            {cartItems.map((item) => (
                                <li key={item.product}>
                                    <div className="row1">
                                        <div className="small">
                                            <img src={item.image} alt="" />
                                        </div>

                                        <div className="min-30">
                                            <Link to={`/products/product/${item.product}`}>{item.name}</Link>
                                        </div>
                                        <div className="qty-select">
                                            <select 
                                                value={item.qty} 
                                                onChange={(e) => 
                                                    dispatch(addToCart(item.product, Number(e.target.value)))
                                                }>
                                                {[...Array(item.stock).keys()].map((x) => (
                                                    <option key={x+1} value={x+1}>
                                                        {x+1}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <p>${item.price * item.qty}</p>
                                        <div className="remove-btn">
                                            <button type="button" onClick={() => removeProduct(item.product)}>
                                                <CancelIcon />
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="col-5">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <p>
                                    Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) :
                                </p>
                                <p className="price">
                                    $ {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                                </p>
                            </li>
                            <li>
                                <button 
                                    type="button" 
                                    onClick={checkOut}
                                    className="checkout-btn"
                                    disabled={cartItems.length === 0 || error}  // Disable button if cart is empty or error occurs
                                >
                                    Proceed to Checkout
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
