import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductList from "../components/ProductList";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "../styles/Home.css";
import Product from "../components/Product";
import { listProducts } from "../actions/ProdcutActions";

const Home = () => {
  const dispatch = useDispatch();

  // Dispatch the action to fetch products when the component is mounted
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  // Accessing the productList state from Redux store
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  // Slider settings for the hero banner
  const bannerSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  // Slider settings for the "More Products" section
  const productSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1400,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 900,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 680,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="home-page-container">
      {/* Hero Banner */}
      <div className="banner-container">
        <Slider {...bannerSettings}>
          <div className="banner-item">
            <img
              src="https://m.media-amazon.com/images/S/aplus-media/vc/342b936a-69f1-4e59-89ba-7ddb98c1acda.jpg"
              alt="Gaming Monitor"
              className="banner-image"
            />
          </div>
          <div className="banner-item">
            <img
              src="https://cdn.shopify.com/s/files/1/1780/7915/files/Thermaltake_Level_20_RGB_Titanium_Gaming_Keyboard_From_The_Peripheral_Store_Banner_01.jpg?v=1598266526"
              alt="Gaming Keyboard"
              className="banner-image"
            />
          </div>
          <div className="banner-item">
            <img
              src="https://cdn.shopify.com/s/files/1/1780/7915/files/Game_Monitor_6a7a1deb-2d61-4307-99ac-f8c5a18d298f.jpg?8000210842524768871"
              alt="Game Monitor"
              className="banner-image"
            />
          </div>
        </Slider>
      </div>

      {/* Product Section */}
      <div className="product-section">
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : error ? (
          <div className="error-message">Error: {error}</div>
        ) : (
          <ProductList products={products} />
        )}
      </div>

      {/* More Products Section */}
      <div className="home-product-slider">
        <h2 className="sec-title">More Products</h2>
        <Slider {...productSliderSettings}>
          {products && products.length ? (
            products.map((product) => (
              <Product key={product._id} product={product} />
            ))
          ) : (
            <div className="no-products">No products available</div>
          )}
        </Slider>
      </div>
    </div>
  );
};

export default Home;
