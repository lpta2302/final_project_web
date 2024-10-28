import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { Card, CardMedia, IconButton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "slick-carousel/slick/slick.css"; // Import slick CSS
import "slick-carousel/slick/slick-theme.css"; // Import slick-theme CSS

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

// Component custom arrow phải
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50%",
        padding: "10px",
        cursor: "pointer",
        position: "absolute",
        right: "0", // Đặt mũi tên ra ngoài bên phải
        top: "50%", // Căn giữa theo chiều dọc
        transform: "translateY(-50%)", // Điều chỉnh cho đúng giữa chiều cao
        zIndex: 1,
      }}
    >
      <ArrowForwardIcon color="white" />
    </IconButton>
  );
};

// Component custom arrow trái
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50%",
        padding: "10px",
        cursor: "pointer",
        position: "absolute",
        left: "0", // Đặt mũi tên ra ngoài bên trái
        top: "50%", // Căn giữa theo chiều dọc
        transform: "translateY(-50%)", // Điều chỉnh cho đúng giữa chiều cao
        zIndex: 1,
      }}
    >
      <ArrowBackIcon color="white" />
    </IconButton>
  );
};

const BannerSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Thêm autoplay để chạy tự động
    autoplaySpeed: 3000, // Chuyển slide sau 3 giây
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
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
              width: "100%",
            }}
          >
            <CardMedia
              component="img"
              image={banner.image}
              alt={banner.title}
              sx={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                maxHeight: "320px",
                borderRadius: "8px",
              }}
            />
          </Card>
        </Link>
      ))}
    </Slider>
  );
};

export default BannerSlider;
