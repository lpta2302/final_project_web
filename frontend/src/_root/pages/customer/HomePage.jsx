import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme, CircularProgress, Grid2 } from "@mui/material";
import Slider from "react-slick";
import BannerSlider from "../../../components/Homepage/BannerSlider";
import ProductCard from "../../../components/Homepage/ProductCard";
import SubNavbar from "../../../components/Homepage/Subnavbar";
import { useReadAllCategory, useReadAllProduct, useReadWishlistItems } from "../../../api/queries";
import { useAuthContext } from "../../../context/AuthContext";

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
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
  const { user, isAuthenticated } = useAuthContext();
  const [userId, setUserId] = useState()
  const [favorites, setFavorites] = useState({});
  const { data: categories, isLoading: isLoadingCat } = useReadAllCategory();
  const {
    data: products,
    isLoading: isLoadingProd,
    isError,
    error,
  } = useReadAllProduct();
  const { data: wishList } = useReadWishlistItems(userId);
  console.log(products);
  
  useEffect(() => {
    if (!isAuthenticated || !user._id) return;
    setUserId(user._id)
  }, [user]);
  if (isLoadingCat || isLoadingProd) {
    return <CircularProgress />;
  }

  if (isError || !products) {
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
        <Box display='inline-flex' gap={2} overflow="auto" width="100%" py={1}>
          {products?.map((product) => (
            <ProductCard wishList={wishList} customer={user} isLoggedIn product={product} key={product._id} />
          ))}
        </Box>

        {/* Promotion Products Section */}
        <Typography
          variant="h4"
          align="left"
          sx={{ margin: "30px 0", fontSize: "24px", fontWeight: "600" }}
        >
          Sản phẩm khuyến mãi
        </Typography>
        <Box display='inline-flex' gap={2} overflow="auto" width="100%" py={1}>
          {products?.map((product) => (
            <ProductCard wishList={wishList} customer={user} isLoggedIn={isAuthenticated} product={product} key={product._id} />
          ))}
        </Box>

        {/* Best-selling Products Section */}
        <Typography
          variant="h4"
          align="left"
          sx={{ margin: "30px 0", fontSize: "24px", fontWeight: "600" }}
        >
          Laptop bán chạy
        </Typography>
        <Box display='inline-flex' gap={2} overflow="auto" width="100%" py={1}>
          {products?.map((product) => (
            <ProductCard wishList={wishList} customer={user} isLoggedIn={isAuthenticated} product={product} key={product._id} />
          ))}
        </Box>

        {/* Featured Products Section */}
        <Typography
          variant="h4"
          align="left"
          sx={{ margin: "30px 0", fontSize: "24px", fontWeight: "600" }}
        >
          Sản phẩm nổi bật
        </Typography>
        <Box display='inline-flex' gap={2} overflow="auto" width="100%" py={1}>
          {products?.map((product) => (
            <ProductCard wishList={wishList} customer={user} isLoggedIn={isAuthenticated} product={product} key={product._id} />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
