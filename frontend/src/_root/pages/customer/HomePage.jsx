import { Link } from "react-router-dom";
import React, { useState } from "react";
import {
  Typography,
  Container,
  Card,
  CardContent,
  CardMedia,
  Button,
  Toolbar,
  IconButton,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import {
  Category as CategoryIcon,
  BrandingWatermark as BrandIcon,
  KeyboardArrowDown,
} from "@mui/icons-material";

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
  // Cập nhật id cho các sản phẩm còn lại
  {
    id: 5,
    title: "Máy tính Jack 6 củ",
    image:
      "https://phongvu.vn/cong-nghe/wp-content/uploads/sites/2/2020/09/Dell-XPS-15-1024x572.jpg",
    price: 1600,
  },
  {
    id: 6,
    title: "Máy tính Jack 7 củ",
    image:
      "https://phongvu.vn/cong-nghe/wp-content/uploads/sites/2/2020/09/Dell-XPS-15-1024x572.jpg",
    price: 1700,
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
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  swipeToSlide: true,
  draggable: true,
  touchMove: true,
  cssEase: "cubic-bezier(0.25, 0.8, 0.25, 1)",
  adaptiveHeight: true,
  autoplay: false,
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
              height="500"
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
            <Typography
              variant="h6"
              align="center"
              color="textPrimary"
              sx={{
                height: "60px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {product.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ height: "30px" }}
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

const SubNavbar = () => {
  const navigate = useNavigate();

  const [categoryAnchorEl, setCategoryAnchorEl] = useState(null);
  const [brandAnchorEl, setBrandAnchorEl] = useState(null);

  const handleCategoryMouseEnter = (event) => {
    setCategoryAnchorEl(event.currentTarget);
  };

  const handleBrandMouseEnter = (event) => {
    setBrandAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setCategoryAnchorEl(null);
    setBrandAnchorEl(null);
  };

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category}`);
    handleMenuClose();
  };

  const handleBrandClick = (brand) => {
    navigate(`/products?brand=${brand}`);
    handleMenuClose();
  };

  return (
    <Toolbar
      sx={{
        backgroundColor: "#fff",
        borderBottom: "1px solid #ddd",
        paddingY: "10px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
        {/* Danh mục */}
        <IconButton
          onMouseEnter={handleCategoryMouseEnter}
          color="inherit"
          sx={{
            marginRight: 3,
            "&:hover": {
              color: "#ff4081",
            },
          }}
        >
          <CategoryIcon fontSize="medium" sx={{ marginRight: "5px" }} />
          <Typography variant="h6" display="inline">
            Danh mục
          </Typography>
          <KeyboardArrowDown />
        </IconButton>
        <Menu
          anchorEl={categoryAnchorEl}
          open={Boolean(categoryAnchorEl)}
          onClose={handleMenuClose}
          MenuListProps={{
            onMouseLeave: handleMenuClose,
          }}
          sx={{
            minWidth: "200px", // Điều chỉnh độ rộng tối thiểu của menu
          }}
        >
          <MenuItem
            onClick={() => handleCategoryClick("Laptop")}
            sx={{ minWidth: "200px" }}
          >
            Laptop
          </MenuItem>
          <MenuItem
            onClick={() => handleCategoryClick("Chuột")}
            sx={{ minWidth: "200px" }}
          >
            Chuột
          </MenuItem>
          <MenuItem
            onClick={() => handleCategoryClick("Tai nghe")}
            sx={{ minWidth: "200px" }}
          >
            Tai nghe
          </MenuItem>
          <MenuItem
            onClick={() => handleCategoryClick("Loa")}
            sx={{ minWidth: "200px" }}
          >
            Loa
          </MenuItem>
        </Menu>

        {/* Thương hiệu */}
        <IconButton
          onMouseEnter={handleBrandMouseEnter}
          color="inherit"
          sx={{
            "&:hover": {
              color: "#ff4081",
            },
          }}
        >
          <BrandIcon fontSize="medium" sx={{ marginRight: "5px" }} />
          <Typography variant="h6" display="inline">
            Thương hiệu
          </Typography>
          <KeyboardArrowDown />
        </IconButton>
        <Menu
          anchorEl={brandAnchorEl}
          open={Boolean(brandAnchorEl)}
          onClose={handleMenuClose}
          MenuListProps={{
            onMouseLeave: handleMenuClose,
          }}
          sx={{ minWidth: "200px" }}
        >
          <MenuItem
            onClick={() => handleBrandClick("Dell")}
            sx={{ minWidth: "200px" }}
          >
            Dell
          </MenuItem>
          <MenuItem
            onClick={() => handleBrandClick("Apple")}
            sx={{ minWidth: "200px" }}
          >
            Apple
          </MenuItem>
          <MenuItem
            onClick={() => handleBrandClick("HP")}
            sx={{ minWidth: "200px" }}
          >
            HP
          </MenuItem>
        </Menu>
      </Box>
    </Toolbar>
  );
};

const HomePage = ({ handleAddToCart }) => {
  return (
    <Container>
      <SubNavbar />
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
  );
};

export default HomePage;
