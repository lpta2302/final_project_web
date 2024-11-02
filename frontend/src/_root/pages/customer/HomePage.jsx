import React, { useState } from "react";
import { Box, Typography, useTheme, CircularProgress } from "@mui/material";
import Slider from "react-slick";
import BannerSlider from "../../../components/Homepage/BannerSlider";
import ProductCard from "../../../components/Homepage/ProductCard";
import SubNavbar from "../../../components/Homepage/Subnavbar";
import { useReadAllCategory, useReadAllProduct } from "../../../api/queries";

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
      },
    },
  ],
};

const HomePage = ({ handleAddToCart }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [favorites, setFavorites] = useState({});
  const { data: categories, isLoading: isLoadingCat } = useReadAllCategory();
  const {
    data: products,
    isLoading: isLoadingProd,
    isError,
    error,
  } = useReadAllProduct();

  const theme = useTheme();

  const handleToggleFavorite = (product) => {
    if (!isLoggedIn) {
      alert("Bạn cần đăng nhập để thích sản phẩm này!");
      return;
    }
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [product.id]: !prevFavorites[product.id],
    }));
  };

  if (isLoadingCat || isLoadingProd) {
    return <CircularProgress />;
  }

  if (isError) {
    return <Typography>Có lỗi xảy ra: {error.message}</Typography>;
  }

  return (
    <>
      <Box
        component={"section"}
        sx={{ "& .MuiContainer-root": { p: { md: "12px", lg: "0" } } }}
      >
        <Box flex="1" display={"flex"}>
          <SubNavbar categories={categories} />
          <Box width={{ xs: "100%", md: "calc(100% - 220px)" }}>
            <BannerSlider />
          </Box>
        </Box>

        {/* Popular Products Section */}
        <Typography
          variant="h4"
          align="left"
          sx={{ margin: "30px 0", fontSize: "24px", fontWeight: "600" }}
        >
          Sản phẩm thịnh hành
        </Typography>
        <Slider {...sliderSettings}>
          {products.map((product) => (
            <ProductCard
              product={product}
              key={product.id}
              handleToggleFavorite={handleToggleFavorite}
              isFavorite={favorites[product.id]}
            />
          ))}
        </Slider>

        {/* Promotion Products Section */}
        <Typography
          variant="h4"
          align="left"
          sx={{ margin: "30px 0", fontSize: "24px", fontWeight: "600" }}
        >
          Sản phẩm khuyến mãi
        </Typography>
        <Slider {...sliderSettings}>
          {products.map((product) => (
            <ProductCard
              product={product}
              key={product.id}
              handleToggleFavorite={handleToggleFavorite}
              isFavorite={favorites[product.id]}
            />
          ))}
        </Slider>

        {/* Best-selling Products Section */}
        <Typography
          variant="h4"
          align="left"
          sx={{ margin: "30px 0", fontSize: "24px", fontWeight: "600" }}
        >
          Laptop bán chạy
        </Typography>
        <Slider {...sliderSettings}>
          {products.map((product) => (
            <ProductCard
              product={product}
              key={product.id}
              handleToggleFavorite={handleToggleFavorite}
              isFavorite={favorites[product.id]}
            />
          ))}
        </Slider>

        {/* Featured Products Section */}
        <Typography
          variant="h4"
          align="left"
          sx={{ margin: "30px 0", fontSize: "24px", fontWeight: "600" }}
        >
          Sản phẩm nổi bật
        </Typography>
        <Slider {...sliderSettings}>
          {products.map((product) => (
            <ProductCard
              product={product}
              key={product.id}
              handleToggleFavorite={handleToggleFavorite}
              isFavorite={favorites[product.id]}
            />
          ))}
        </Slider>
      </Box>
    </>
  );
};

export default HomePage;
