import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import Slider from "react-slick";
import BannerSlider from "../../../components/Homepage/BannerSlider";
import ProductCard from "../../../components/Homepage/ProductCard";
import SubNavbar from "../../../components/Homepage/Subnavbar";
import {
  useReadAllCategory,
  useReadAllProduct,
  useReadWishlistItems,
} from "../../../api/queries";
import { useAuthContext } from "../../../context/AuthContext";

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3 } },
    { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2 } },
    { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
  ],
};

const ProductSlider = ({ title, products, favorites, setFavorites }) => (
  <>
    <Typography
      variant="h4"
      sx={{ margin: "30px 0", fontSize: "24px", fontWeight: "600" }}
    >
      {title}
    </Typography>
    <Slider {...sliderSettings}>
      {products.map((product) => (
        <ProductCard
          product={product}
          key={product._id}
          favorites={favorites}
          setFavorites={setFavorites}
        />
      ))}
    </Slider>
  </>
);

const HomePage = () => {
  const { isAuthenticated, user } = useAuthContext();
  const [favorites, setFavorites] = useState({});
  const { data: wishlistItems } = useReadWishlistItems(user?._id);
  const { data: categories, isLoading: isLoadingCat } = useReadAllCategory();
  const {
    data: products,
    isLoading: isLoadingProd,
    isError,
    error,
  } = useReadAllProduct();

  useEffect(() => {
    if (wishlistItems && wishlistItems.length > 0) {
      const updatedFavorites = wishlistItems.reduce((acc, item) => {
        acc[item.productId] = true;
        return acc;
      }, {});
      setFavorites(updatedFavorites);
    }
  }, [wishlistItems]);

  if (isLoadingCat || isLoadingProd) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Typography>Có lỗi xảy ra: {error.message}</Typography>;
  }

  return (
    <Box
      component="section"
      sx={{ "& .MuiContainer-root": { p: { md: "12px", lg: "0" } } }}
    >
      <Box display="flex">
        <SubNavbar categories={categories} />
        <Box width={{ xs: "100%", md: "calc(100% - 220px)" }}>
          <BannerSlider />
        </Box>
      </Box>
      <ProductSlider
        title="Sản phẩm thịnh hành"
        products={products}
        favorites={favorites}
        setFavorites={setFavorites}
      />
      <ProductSlider
        title="Sản phẩm khuyến mãi"
        products={products}
        favorites={favorites}
        setFavorites={setFavorites}
      />
      <ProductSlider
        title="Laptop bán chạy"
        products={products}
        favorites={favorites}
        setFavorites={setFavorites}
      />
      <ProductSlider
        title="Sản phẩm nổi bật"
        products={products}
        favorites={favorites}
        setFavorites={setFavorites}
      />
    </Box>
  );
};

export default HomePage;
