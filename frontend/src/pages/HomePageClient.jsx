import { Link } from "react-router-dom";
import React, { useState } from "react";
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  AppBar,
  Toolbar,
  Box,
} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { TopAppBar } from "../components";
import { useNavigate } from "react-router-dom";

// Sample data for products
const products = [
  {
    id: 1,
    title: "Laptop Dell XPS 13",
    image:
      "https://laptopdell.com.vn/wp-content/uploads/2022/07/laptop_lenovo_legion_s7_8.jpg",
    price: 1000,
  },
  {
    id: 2,
    title: "Laptop HP Spectre x360",
    image:
      "https://www.tnc.com.vn/uploads/news/20230309_SEO/dell-xps-13-plus-1678233879.png",
    price: 1200,
  },
  {
    id: 3,
    title: "Máy tính để bàn iMac",
    image:
      "https://phongvu.vn/cong-nghe/wp-content/uploads/sites/2/2020/09/Dell-XPS-15-1024x572.jpg",
    price: 1500,
  },
  {
    id: 4,
    title: "Máy tính Jack 5 củ",
    image:
      "https://phongvu.vn/cong-nghe/wp-content/uploads/sites/2/2020/09/Dell-XPS-15-1024x572.jpg",
    price: 1500,
  },
  {
    id: 4,
    title: "Máy tính Jack 5 củ",
    image:
      "https://phongvu.vn/cong-nghe/wp-content/uploads/sites/2/2020/09/Dell-XPS-15-1024x572.jpg",
    price: 1500,
  },
  {
    id: 4,
    title: "Máy tính Jack 5 củ",
    image:
      "https://phongvu.vn/cong-nghe/wp-content/uploads/sites/2/2020/09/Dell-XPS-15-1024x572.jpg",
    price: 1500,
  },
  {
    id: 4,
    title: "Máy tính Jack 5 củ",
    image:
      "https://phongvu.vn/cong-nghe/wp-content/uploads/sites/2/2020/09/Dell-XPS-15-1024x572.jpg",
    price: 1500,
  },
  {
    id: 4,
    title: "Máy tính Jack 5 củ",
    image:
      "https://phongvu.vn/cong-nghe/wp-content/uploads/sites/2/2020/09/Dell-XPS-15-1024x572.jpg",
    price: 1500,
  },
  {
    id: 4,
    title: "Máy tính Jack 5 củ",
    image:
      "https://phongvu.vn/cong-nghe/wp-content/uploads/sites/2/2020/09/Dell-XPS-15-1024x572.jpg",
    price: 1500,
  },
  {
    id: 4,
    title: "Máy tính Jack 5 củ",
    image:
      "https://phongvu.vn/cong-nghe/wp-content/uploads/sites/2/2020/09/Dell-XPS-15-1024x572.jpg",
    price: 1500,
  },
];

const banners = [
  {
    id: 1,
    image:
      "https://giatin.com.vn/wp-content/uploads/2020/11/cac-loai-kich-thuoc-man-hinh-laptop.jpg",
    title: "Deal HP Ngập Tràn",
  },
  {
    id: 2,
    image:
      "https://img.lovepik.com/bg/20240112/Astonishing-Laptop-Image-with-Sky-as-Cloudy-Background_2759597_wh860.jpg!/fw/860",
    title: "Hot Deal",
  },
  {
    id: 3,
    image:
      "https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/145289/Originals/pc-game.png",
    title: "Thiết Bị Mạng Chính Hãng",
  },
  {
    id: 4,
    image:
      "https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/145289/Originals/pc-game.png",
    title: "Laptop Jack 5 củ",
  },
];

const sliderSettings = {
  dots: false, // No dots for a cleaner look
  infinite: true, // Allows infinite scrolling
  speed: 500, // Adjust speed of slide transition
  slidesToShow: 4, // Number of visible items
  slidesToScroll: 1, // Scroll 1 item at a time for smoother dragging
  swipeToSlide: true, // Allow users to swipe and move between slides naturally
  draggable: true, // Enable dragging on desktop
  touchMove: true, // Allow touch move for mobile devices
  cssEase: "cubic-bezier(0.25, 0.8, 0.25, 1)", // Smooth ease-in-out effect
  adaptiveHeight: true, // Adjust height smoothly based on content
  autoplay: false, // Option to autoplay slides
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
// BannerSlider with Link to navigate
const BannerSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {banners.map((banner) => (
        <Link
          to={`/products/${banner.id}`}
          key={banner.id}
          style={{ textDecoration: "none" }}
        >
          <Card>
            <CardMedia
              component="img"
              height="500" // Tăng chiều cao banner
              image={banner.image}
              alt={banner.title}
              sx={{ cursor: "pointer", marginTop: "10px" }}
            />
            <CardContent>
              <Typography variant="h5" align="center">
                {banner.title}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      ))}
    </Slider>
  );
};

// ProductCard with Add to Cart functionality
const ProductCard = ({ product, handleAddToCart }) => {
  return (
    <div style={{ padding: "0 10px", marginBottom: "10px" }}>
      <Link
        to={`/product-detail/${product.id}`}
        style={{ textDecoration: "none" }}
      >
        <Card sx={{ maxWidth: "100%", marginBottom: 2 }}>
          <CardMedia
            component="img"
            height="180"
            image={product.image}
            alt={product.title}
          />
          <CardContent>
            {/* Giới hạn chiều cao cho tiêu đề để tránh rớt chữ */}
            <Typography
              variant="h6"
              align="center"
              color="textPrimary"
              sx={{
                height: "60px", // Giới hạn chiều cao tiêu đề
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2, // Giới hạn hiển thị 2 dòng
                WebkitBoxOrient: "vertical",
              }}
            >
              {product.title}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ height: "30px" }} // Đảm bảo chiều cao đồng nhất
            >
              Giá: ${product.price}
            </Typography>
          </CardContent>
        </Card>
      </Link>
      <Button
        size="small"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 1 }}
        onClick={() => handleAddToCart(product)}
      >
        Thêm vào giỏ hàng
      </Button>
    </div>
  );
};

// SubNavbar component for categories and brands
const SubNavbar = () => {
  const navigate = useNavigate();

  // Handle category and brand click
  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category}`);
  };

  const handleBrandClick = (brand) => {
    navigate(`/products?brand=${brand}`);
  };

  return (
    <Toolbar sx={{ backgroundColor: "#f4f4f4" }}>
      <Box sx={{ flexGrow: 1 }}>
        {/* NavItems by category */}
        <Typography variant="h6" sx={{ display: "inline", marginRight: 2 }}>
          Danh mục:
        </Typography>
        <Button onClick={() => handleCategoryClick("Laptop")} color="inherit">
          Laptop
        </Button>
        <Button onClick={() => handleCategoryClick("PC")} color="inherit">
          PC
        </Button>
        <Button onClick={() => handleCategoryClick("Màn hình")} color="inherit">
          Màn hình
        </Button>
        <Button onClick={() => handleCategoryClick("Lâm")} color="inherit">
          Lâm
        </Button>
        <Button onClick={() => handleCategoryClick("Ân")} color="inherit">
          Ân
        </Button>
        <Button onClick={() => handleCategoryClick("Kiệt")} color="inherit">
          Kiệt
        </Button>

        {/* NavItems by brand */}
        <Typography variant="h6" sx={{ display: "inline", marginLeft: 4 }}>
          Thương hiệu:
        </Typography>
        <Button onClick={() => handleBrandClick("Dell")} color="inherit">
          Dell
        </Button>
        <Button onClick={() => handleBrandClick("HP")} color="inherit">
          HP
        </Button>
        <Button onClick={() => handleBrandClick("Apple")} color="inherit">
          Apple
        </Button>
        <Button onClick={() => handleBrandClick("Acer")} color="inherit">
          Acer
        </Button>
        <Button onClick={() => handleBrandClick("Asus")} color="inherit">
          Asus
        </Button>
        <Button onClick={() => handleBrandClick("Lenovo")} color="inherit">
          Lenovo
        </Button>
      </Box>
    </Toolbar>
  );
};

// Home page component with cart management
const HomePageClient = () => {
  const [cart, setCart] = useState([]);

  // Function to handle adding product to cart
  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.title} đã được thêm vào giỏ hàng.`);
  };

  return (
    <>
      {/* AppBar fixed with higher zIndex */}
      <TopAppBar sx={{ zIndex: 1200 }} position="fixed" />

      {/* Toolbar to create spacing equivalent to AppBar's height */}
      <Toolbar />

      {/* SubNavbar ngay dưới TopAppBar */}
      <SubNavbar />

      {/* Main content container */}
      <Container>
        {/* Banners Section */}
        <BannerSlider />

        {/* Popular Products Section */}
        <Typography
          variant="h4"
          align="left"
          sx={{ margin: "30px 0", fontSize: "24px" }}
        >
          Sản phẩm thịnh hành
        </Typography>
        <Slider {...sliderSettings}>
          {products.map((product) => (
            <ProductCard
              product={product}
              key={product.id}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </Slider>

        {/* Promotion Products Section */}
        <Typography
          variant="h4"
          align="left"
          sx={{ margin: "30px 0", fontSize: "24px" }}
        >
          Sản phẩm khuyến mãi
        </Typography>
        <Slider {...sliderSettings}>
          {products.map((product) => (
            <ProductCard
              product={product}
              key={product.id}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </Slider>

        {/* Best-selling Products Section */}
        <Typography
          variant="h4"
          align="left"
          sx={{ margin: "30px 0", fontSize: "24px" }}
        >
          Laptop bán chạy
        </Typography>
        <Slider {...sliderSettings}>
          {products.map((product) => (
            <ProductCard
              product={product}
              key={product.id}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </Slider>

        {/* Featured Products Section */}
        <Typography
          variant="h4"
          align="left"
          sx={{ margin: "30px 0", fontSize: "24px" }}
        >
          Sản phẩm nổi bật
        </Typography>
        <Slider {...sliderSettings}>
          {products.map((product) => (
            <ProductCard
              product={product}
              key={product.id}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </Slider>
      </Container>
    </>
  );
};

export default HomePageClient;
