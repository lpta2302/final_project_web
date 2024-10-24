import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const ProductCard = ({ product, handleToggleFavorite, isFavorite }) => (
  <div style={{ padding: "0 10px", marginBottom: "10px" }}>
    <Link
      to={`/product-detail/${product.id}`}
      style={{ textDecoration: "none" }}
    >
      <Card sx={{ maxWidth: "100%", marginBottom: 2 }}>
        <CardMedia
          component="img"
          height="180"
          image={product.imageUrl}
          alt={product.title}
        />
        <CardContent>
          <Typography variant="h6" align="center" color="textPrimary">
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            Tình trạng: {product.status}
          </Typography>
          <Typography variant="body2" color="error" align="center">
            {product.originalPrice} VND
          </Typography>
        </CardContent>
      </Card>
    </Link>

    {/* Favorite button */}
    <IconButton
      onClick={() => handleToggleFavorite(product)}
      color={isFavorite ? "error" : "default"}
      sx={{ display: "block", margin: "0 auto" }}
    >
      {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </IconButton>
  </div>
);

export default ProductCard;
