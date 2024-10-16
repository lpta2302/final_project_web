import React from "react";
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";

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
  // Đảm bảo không có id trùng lặp
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
      "https://anphat.com.vn/media/lib/18-08-2023/lenovoyogaslim7pro14iah782ut006cvn1.jpg",
    title: "Sản Phẩm Mới",
  },
];

const HomePage = () => {
  return (
    <Container>
      <Grid item xs={9} style={{ marginTop: "10px" }}>
        <Grid container spacing={2}>
          {banners.map((banner) => (
            <Grid item xs={12} sm={6} md={6} key={banner.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={banner.image}
                  alt={banner.title}
                  style={{ cursor: "poiter" }}
                />
                <CardContent>
                  <Typography variant="h5">{banner.title}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Typography variant="h4" align="center" style={{ margin: "50px 0" }}>
        Sản phẩm khuyến mãi
      </Typography>
      <Grid container spacing={0.5}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ maxWidth: 300 }}>
              <CardMedia
                component="img"
                height="140"
                image={product.image}
                alt={product.title}
              />
              <CardContent>
                <Typography variant="h5">{product.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Giá: ${product.price}
                </Typography>
                <Button size="small" variant="contained" color="primary">
                  Thêm vào giỏ hàng
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Typography variant="h4" align="center" style={{ margin: "20px 0" }}>
        Laptop bán chạy
      </Typography>
      <Grid container spacing={0.5}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ maxWidth: 300 }}>
              <CardMedia
                component="img"
                height="140"
                image={product.image}
                alt={product.title}
              />
              <CardContent>
                <Typography variant="h5">{product.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Giá: ${product.price}
                </Typography>
                <Button size="small" variant="contained" color="primary">
                  Thêm vào giỏ hàng
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Typography variant="h4" align="center" style={{ margin: "20px 0" }}>
        Sản phẩm nổi bật
      </Typography>
      <Grid container spacing={0.5}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ maxWidth: 300 }}>
              <CardMedia
                component="img"
                height="140"
                image={product.image}
                alt={product.title}
              />
              <CardContent>
                <Typography variant="h5">{product.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Giá: ${product.price}
                </Typography>
                <Button size="small" variant="contained" color="primary">
                  Thêm vào giỏ hàng
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
