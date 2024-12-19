import axios from "../Axios";
import { 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_FAIL, 
    PRODUCT_LIST_SUCCESS,
    PRODUCT_DETAILS_REQUEST, 
    PRODUCT_DETAILS_FAIL, 
    PRODUCT_DETAILS_SUCCESS 
} from "../constants/ProductConstants";

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST });

        const { data } = await axios.get('/api/products');

        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};



// Action to fetch product details by ID
export const detailsProduct = (productID) => async (dispatch) => {
    dispatch({
        type: PRODUCT_DETAILS_REQUEST,
        payload: productID,
    });

    try {
        const { data } = await axios.get(`/api/products/${productID}`); // Backend API call
        console.log("Product Details API Response: ", data); // Debug log

        // Dispatch success action with product details
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        console.error("Product Details API Error: ", error.message); // Debug log

        // Dispatch fail action with error message
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};
