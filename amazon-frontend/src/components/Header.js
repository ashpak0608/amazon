import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import { useSelector, useDispatch } from 'react-redux';
import { signout } from '../actions/UserAction';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SearchIcon from '@material-ui/icons/Search';

const Header = () => {
    const dispatch = useDispatch();
    const [dropdown, setDropDown] = useState(false);
    const [secondDropdown, setSecondDropdown] = useState(false);
    const [query, setQuery] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const showDropDown = () => setDropDown((prev) => !prev);
    const showSecondDropDown = () => setSecondDropdown((prev) => !prev);
    const signOutHandler = () => dispatch(signout());

    const toggleMenu = () => setMenuOpen((prev) => !prev);

    useEffect(() => {
        // Close dropdowns when clicked outside
        const handleClickOutside = (e) => {
            if (!e.target.closest('.header-dropdown')) {
                setDropDown(false);
                setSecondDropdown(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <header>
            <div className="container">
                <div className="inner-content">
                    {/* Brand Logo */}
                    <div className="brand">
                        <Link to="/">Amazon Clone</Link>
                    </div>

                    {/* Search Bar */}
                    <div className="search-bar">
                        <input
                            className="search-input"
                            type="text"
                            placeholder="Search products"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            aria-label="Search products"
                        />
                        <div className="search-btn">
                            <Link to={`/searchresults/${query}`} aria-label="Search">
                                <SearchIcon />
                            </Link>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <ul className="nav-links">
                        {/* Cart Icon */}
                        <li>
                            <Link to="/cart" aria-label="Go to cart">
                                <ShoppingCartIcon />
                                {cartItems.length > 0 && <p className="badge">{cartItems.length}</p>}
                            </Link>
                        </li>

                        {/* User Authentication */}
                        <li>
                            {userInfo ? (
                                <div className="header-dropdown">
                                    <p onClick={showDropDown} aria-haspopup="true" aria-expanded={dropdown}>
                                        {userInfo.name}
                                        <ArrowDropDownIcon />
                                    </p>
                                    <ul className={dropdown ? 'dropdown-content show' : 'dropdown-content'} aria-labelledby="user-dropdown">
                                        <li>
                                            <Link to="/profile" aria-label="View profile">Account</Link>
                                        </li>
                                        <li>
                                            <Link to="/orderhistory" aria-label="View order history">Order History</Link>
                                        </li>
                                        <li>
                                            <Link to="/" onClick={signOutHandler} aria-label="Sign out">Sign out</Link>
                                        </li>
                                    </ul>
                                </div>
                            ) : (
                                <Link to="/signin" aria-label="Sign in">
                                    <AccountCircleIcon />
                                </Link>
                            )}
                        </li>

                        {/* Admin Section */}
                        {userInfo && userInfo.isAdmin && (
                            <li>
                                <div className="header-dropdown">
                                    <p onClick={showSecondDropDown} aria-haspopup="true" aria-expanded={secondDropdown}>
                                        Admin
                                        <ArrowDropDownIcon />
                                    </p>
                                    <ul className={secondDropdown ? 'dropdown-content show' : 'dropdown-content'} aria-labelledby="admin-dropdown">
                                        <li>
                                            <Link to="/productlist" aria-label="Manage products">Products</Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        )}
                    </ul>

                    {/* Hamburger Menu */}
                    <div className="hamburger-menu" onClick={toggleMenu}>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                </div>
            </div>

            {/* Category Navigation */}
            <div className={`category-container ${menuOpen ? 'open' : ''}`}>
                <ul>
                    <li><Link to="/category/mobile" aria-label="Mobile">Mobile</Link></li>
                    <li><Link to="/category/laptop" aria-label="Laptop">Laptop</Link></li>
                    <li><Link to="/category/monitor" aria-label="Monitor">Monitor</Link></li>
                    <li><Link to="/category/accessories" aria-label="Computer Accessories">Computer Accessories</Link></li>
                    <li><Link to="/category/earphones" aria-label="Earphones">Earphones</Link></li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
