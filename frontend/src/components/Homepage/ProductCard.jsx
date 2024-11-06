import React from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link } from "react-router-dom"; // Import Link từ react-router-dom

const ProductCard = ({ product, handleToggleFavorite, isFavorite }) => {
  return (
    <Card
      sx={{
        maxWidth: 300,
        width: "100%",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        height: "525px", // Chiều cao cố định cho các thẻ card
      }}
    >
      <Link
        to={`/product/${product.slug}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <CardMedia
          component="img"
          image={product.imageURLs[0]}
          alt={product.productName}
          sx={{
            width: "100%",
            height: "300px",
            objectFit: "cover",
            borderRadius: "8px 8px 0 0",
          }}
        />
        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="h6" component="div">
              {product.productName}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ marginBottom: "8px" }}
            >
              {product.description}
            </Typography>
          </Box>
          <Typography
            variant="body1"
            style={{
              color: product.productStatus === "available" ? "green" : "red",
            }}
          >
            Trạng thái:{" "}
            {product.productStatus === "available" ? "Còn hàng" : "Hết hàng"}
          </Typography>
        </CardContent>
      </Link>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={2}
      >
        <IconButton
          color="error"
          onClick={() => handleToggleFavorite(product)}
          aria-label="favorite"
        >
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        <Typography variant="body2">Mã: {product.productCode}</Typography>
      </Box>
    </Card>
  );
};

export default ProductCard;
