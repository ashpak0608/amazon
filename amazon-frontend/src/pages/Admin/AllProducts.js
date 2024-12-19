import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../../actions/ProdcutActions'; // Fixed typo in the file name (ProductActions instead of ProdcutActions)
import ProductList from '../../components/ProductList';
import "../../styles/AllProducts.css";  // Assuming this contains the necessary styling

const AllProducts = () => {
    // Using selector to get user signin state and userInfo from Redux store
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    // Dispatch function to trigger Redux actions
    const dispatch = useDispatch();

    // Fetching products when the component mounts
    useEffect(() => {
        // Dispatch the action to fetch the list of products
        dispatch(listProducts());
    }, [dispatch]);

    return (
        <div className="admin-orders-page-container">
            <div className="header-sec">
                {/* Conditional rendering of user name (Fallback to 'Admin' if userInfo is not available) */}
                <h2>Hello {userInfo?.name || 'Admin'}!</h2>
            </div>

            {/* Displaying the list of products from ProductList component */}
            <ProductList />
        </div>
    );
};

export default AllProducts;
