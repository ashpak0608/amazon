import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { cartReducer } from './reducers/CartReducer';
import { orderCreateReducer, orderDetailsReducer, orderMineListReducer, orderPayReducer } from './reducers/OrderReducer';
import { prodcutDetailsReducer, prodcutListReducer } from './reducers/ProductReducer';
import { userDetailsReducer, userRegisterReducer, userSigninReducer, userUpdateProfileReducer } from './reducers/UserReducer';

// Utility function to safely retrieve data from local storage
const getFromLocalStorage = (key, defaultValue) => {
    try {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (error) {
        console.error(`Error reading ${key} from localStorage:`, error);
        return defaultValue;
    }
};

// Initial state with safely loaded local storage values
const initialState = {
    cart: {
        cartItems: getFromLocalStorage('cartItems', []),
        shippingAddress: getFromLocalStorage('shippingAddress', {}),
        paymentMethod: 'PayPal',
    },
    userSignin: {
        userInfo: getFromLocalStorage('userInfo', null),
    },
};

const reducer = combineReducers({
    productList: prodcutListReducer,
    productDetails: prodcutDetailsReducer,
    cart: cartReducer,
    userRegister: userRegisterReducer,
    userSignin: userSigninReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMineList: orderMineListReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
});


const composeEnhancer =
    (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(
    reducer, 
    initialState,
    composeEnhancer(applyMiddleware(thunk)),
);

export default store;