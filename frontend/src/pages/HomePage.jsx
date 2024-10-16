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
    image: "https://example.com/laptop1.jpg",
    price: 1000,
  },
  {
    id: 2,
    title: "Laptop HP Spectre x360",
    image: "https://example.com/laptop2.jpg",
    price: 1200,
  },
  {
    id: 3,
    title: "Máy tính để bàn iMac",
    image: "https://example.com/imac.jpg",
    price: 1500,
  },
  // Đảm bảo không có id trùng lặp
];

const banners = [
  {
    id: 1,
    image: "https://example.com/banner1.jpg",
    title: "Deal HP Ngập Tràn",
  },
  { id: 2, image: "https://example.com/banner2.jpg", title: "Hot Deal" },
  {
    id: 3,
    image:
      "https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/145289/Originals/pc-game.png",
    title: "Thiết Bị Mạng Chính Hãng",
  },
  { id: 4, image: "https://example.com/banner4.jpg", title: "Sản Phẩm Mới" },
];

const HomePage = () => {
  return (
    <Container>
      <Grid item xs={9} style={{ marginTop: "100px" }}>
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

      <Typography variant="h4" align="center" style={{ margin: "20px 0" }}>
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
