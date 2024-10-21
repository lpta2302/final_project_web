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
  IconButton,
  Box,
  Menu,
  MenuItem,
  Rating,
} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { TopAppBar } from "../../../components";
import { useNavigate } from "react-router-dom";
import {
  Category as CategoryIcon,
  BrandingWatermark as BrandIcon,
  KeyboardArrowDown,
} from "@mui/icons-material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Stack from "@mui/material/Stack";

// Sample data for products
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
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: "50%",
        padding: "10px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        cursor: "pointer",
      }}
    >
      <ArrowForwardIcon />
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: "50%",
        padding: "10px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        cursor: "pointer",
      }}
    >
      <ArrowBackIcon />
    </div>
  );
};
const BannerSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Mặc định hiển thị 1 slide trên màn hình nhỏ
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024, // Màn hình từ 1024px trở xuống
        settings: {
          slidesToShow: 3, // Hiển thị 3 slide trên màn hình lớn
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768, // Màn hình từ 768px trở xuống
        settings: {
          slidesToShow: 2, // Hiển thị 2 slide trên màn hình tablet
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480, // Màn hình từ 480px trở xuống (mobile)
        settings: {
          slidesToShow: 1, // Hiển thị 1 slide trên màn hình nhỏ
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 320, // Kích thước nhỏ nhất 320px
        settings: {
          slidesToShow: 1, // Hiển thị 1 slide cho màn hình nhỏ nhất
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {banners.map((banner) => (
        <Link
          to={`/products/${banner.id}`}
          key={banner.id}
          style={{ textDecoration: "none" }}
        >
          <Card
            sx={{
              padding: "8px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              borderRadius: "12px",
              textAlign: "center",
              width: "100%", // Đảm bảo chiếm toàn bộ chiều rộng màn hình
              maxWidth: "100%",
            }}
          >
            <CardMedia
              component="img"
              image={banner.image}
              alt={banner.title}
              sx={{
                width: "100%", // Chiều rộng đầy đủ
                height: "auto", // Chiều cao tự điều chỉnh
                objectFit: "cover", // Ảnh không bị méo
                maxHeight: "320px", // Giới hạn chiều cao phù hợp
                borderRadius: "8px", // Bo góc ảnh cho đẹp
              }}
            />
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
              Tình trạng: {product.status}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ height: "30px", fontSize: "20px", color: "red" }}
            >
              {product.originalPrice} VND
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ height: "30px" }}
            >
              <Rating
                name="read-only"
                value={product.rating || 0}
                readOnly
                sx={{ mt: 1 }}
              />
            </Typography>
          </CardContent>
        </Card>
      </Link>
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
      <>
        {/* Stack chứa các IconButton, sắp xếp theo chiều dọc */}
        <Stack
          direction="column"
          spacing={2}
          sx={{ alignItems: "flex-start", flexGrow: 1 }}
        >
          {/* Danh mục */}

          <IconButton
            onMouseEnter={handleCategoryMouseEnter}
            color="inherit"
            sx={{
              "&:hover": {
                color: "primary.main",
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
              minWidth: "200px",
            }}
          >
            <MenuItem onClick={() => handleCategoryClick("Laptop")}>
              Laptop
            </MenuItem>
            <MenuItem onClick={() => handleCategoryClick("Chuột")}>
              Chuột
            </MenuItem>
            <MenuItem onClick={() => handleCategoryClick("Tai nghe")}>
              Tai nghe
            </MenuItem>
            <MenuItem onClick={() => handleCategoryClick("Loa")}>Loa</MenuItem>
          </Menu>

          {/* Thương hiệu */}
          <Box>
            <IconButton
              onMouseEnter={handleBrandMouseEnter}
              color="inherit"
              sx={{
                "&:hover": {
                  color: "primary.main",
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
              <MenuItem onClick={() => handleBrandClick("Dell")}>Dell</MenuItem>
              <MenuItem onClick={() => handleBrandClick("Apple")}>
                Apple
              </MenuItem>
              <MenuItem onClick={() => handleBrandClick("HP")}>HP</MenuItem>
            </Menu>
          </Box>
        </Stack>
      </>
    </Toolbar>
  );
};

const HomePage = ({ handleAddToCart }) => {
  return (
    <>
      <SubNavbar />
      <Container>
        <TopAppBar />

        <BannerSlider />
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
              handleAddToCart={handleAddToCart}
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
              handleAddToCart={handleAddToCart}
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
              handleAddToCart={handleAddToCart}
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
              handleAddToCart={handleAddToCart}
            />
          ))}
        </Slider>
      </Container>
    </>
  );
};

export default HomePage;
