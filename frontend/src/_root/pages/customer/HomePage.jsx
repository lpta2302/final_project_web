import React, { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Slider from "react-slick";
import BannerSlider from "../../../components/Homepage/BannerSlider";
import ProductCard from "../../../components/Homepage/ProductCard";
import SubNavbar from "../../../components/Homepage/Subnavbar";
import { useReadAllCategory } from "../../../api/queries";

const products = [
  {
    id: 1,
    title: "Laptop Dell XPS",
    description: "Powerful laptop for professionals.",
    originalPrice: 12000000, // Giá gốc
    discountPrice: 10000000, // Giá đã giảm
    status: "In Stock",
    category: "gaming",
    specs: "Core i5, 8GB RAM",
    specification: "i5",
    rating: 4.5,
    imageUrl: "https://via.placeholder.com/300",

    brand: "dell",
    tag: "bestSeller",
  },
  {
    id: 2,
    title: "Laptop HP Spectre",
    description: "Sleek design and powerful performance.",
    originalPrice: 17000000,
    discountPrice: 15000000,
    status: "In Stock",
    category: "office",
    specs: "Core i7, 16GB RAM",
    specification: "i7",
    rating: 4.7,
    imageUrl: "https://via.placeholder.com/300",

    brand: "hp",
    tag: "new",
  },
  {
    id: 3,
    title: "Laptop Dell XPS",
    description: "Powerful laptop for professionals.",
    originalPrice: 12000000, // Giá gốc
    discountPrice: 10000000, // Giá đã giảm
    status: "In Stock",
    category: "gaming",
    specs: "Core i9, 8GB RAM",
    specification: "i9",
    rating: 4.5,
    imageUrl: "https://via.placeholder.com/300",

    brand: "asus",
    tag: "bestSeller",
  },
  {
    id: 4,
    title: "Laptop HP Spectre",
    description: "Sleek design and powerful performance.",
    originalPrice: 17000000,
    discountPrice: 15000000,
    status: "In Stock",
    category: "office",
    specs: "Core i7, 16GB RAM",
    specification: "i7",
    rating: 4.7,
    imageUrl: "https://via.placeholder.com/300",

    brand: "hp",
    tag: "new",
  },
  {
    id: 5,
    title: "Laptop Acer XPS",
    description: "Powerful laptop for professionals.",
    originalPrice: 12000000, // Giá gốc
    discountPrice: 10000000, // Giá đã giảm
    status: "In Stock",
    category: "gaming",
    specs: "Core i5, 8GB RAM",
    specification: "i5",
    rating: 4.5,
    imageUrl: "https://via.placeholder.com/300",

    brand: "acer",
    tag: "bestSeller",
  },
  {
    id: 6,
    title: "Laptop HP Spectre",
    description: "Sleek design and powerful performance.",
    originalPrice: 17000000,
    discountPrice: 15000000,
    status: "In Stock",
    category: "office",
    specs: "Core i7, 16GB RAM",
    specification: "i7",
    rating: 4.7,
    imageUrl: "https://via.placeholder.com/300",

    brand: "hp",
    tag: "new",
  },
  {
    id: 7,
    title: "Laptop Dell XPS",
    description: "Powerful laptop for professionals.",
    originalPrice: 12000000, // Giá gốc
    discountPrice: 10000000, // Giá đã giảm
    status: "In Stock",
    category: "office",
    specs: "Core i3, 8GB RAM",
    specification: "i3",
    rating: 4.5,
    imageUrl: "https://via.placeholder.com/300",

    brand: "dell",
    tag: "bestSeller",
  },
  {
    id: 8,
    title: "Laptop HP Spectre",
    description: "Sleek design and powerful performance.",
    originalPrice: 17000000,
    discountPrice: 15000000,
    status: "In Stock",
    category: "gaming",
    specs: "Core i7, 16GB RAM",
    specification: "i7",
    rating: 4.7,
    imageUrl: "https://via.placeholder.com/300",

    brand: "hp",
    tag: "new",
  },
  {
    id: 9,
    title: "Laptop SamSung",
    description: "Powerful laptop for professionals.",
    originalPrice: 12000000, // Giá gốc
    discountPrice: 10000000, // Giá đã giảm
    status: "In Stock",
    category: "gaming",
    specs: "Core i5, 8GB RAM",
    specification: "i5",
    rating: 4.5,
    imageUrl: "https://via.placeholder.com/300",

    brand: "samsung",
    tag: "bestSeller",
  },
  {
    id: 10,
    title: "Laptop HP Spectre",
    description: "Sleek design and powerful performance.",
    originalPrice: 17000000,
    discountPrice: 15000000,
    status: "In Stock",
    category: "office",
    specs: "Core i9, 16GB RAM",
    specification: "i9",
    rating: 4.7,
    imageUrl: "https://via.placeholder.com/300",

    brand: "hp",
    tag: "new",
  },
];

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
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Moved inside component
  const [favorites, setFavorites] = useState({});
  const { data: categories, isPending: isLoadingCat } = useReadAllCategory();


  const theme = useTheme();

  const handleToggleFavorite = (product) => {
    if (!isLoggedIn) {
      alert("Bạn cần đăng nhập để thích sản phẩm này!");
      return; // Ngăn không cho chuyển trạng thái yêu thích nếu chưa đăng nhập
    }
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [product.id]: !prevFavorites[product.id], // Đảo ngược trạng thái yêu thích của sản phẩm
    }));
  };

  if (isLoadingCat) {
    return <Typography>loading...</Typography>
  }

  return (
    <>
      {/* <SubNavbar /> */}
      <Box component={"section"}
        sx={{
          '& .MuiContainer-root': {
            p: {
              md: '12px', // Padding of 12px for medium screens and up
              lg: '0',    // Padding of 0 for large screens and up
            },
          },
        }}
      >
        <Box flex='1' display={"flex"}
        // sx={{ 
        //   height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)` 
        //   }}
        >
          <SubNavbar categories={categories} />
          <Box
            width={{
              xs: '100%',
              md: 'calc(100% - 220px)'
            }}
          >
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
              isFavorite={favorites[product.id]} // Kiểm tra trạng thái yêu thích
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
              isFavorite={favorites[product.id]} // Kiểm tra trạng thái yêu thích
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
              isFavorite={favorites[product.id]} // Kiểm tra trạng thái yêu thích
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
              isFavorite={favorites[product.id]} // Kiểm tra trạng thái yêu thích
            />
          ))}
        </Slider>
      </Box>
    </>
  );
};
export default HomePage;
