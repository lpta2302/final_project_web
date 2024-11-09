import React, { useState } from "react";
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
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import {
  useAddItemToWishlist,
  useRemoveItemFromWishlist,
} from "../../api/queries";

const ProductCard = ({ product, favorites, setFavorites }) => {
  const { isAuthenticated, user } = useAuthContext();
  const [isFavorite, setIsFavorite] = useState(favorites[product._id] || false);

  const { mutate: addItemToWishlist } = useAddItemToWishlist();
  const { mutate: removeItemFromWishlist } = useRemoveItemFromWishlist();

  const handleFavoriteClick = () => {
    if (!isAuthenticated) {
      window.location.href = "/login";
      return;
    }

    if (isFavorite) {
      // Xóa sản phẩm khỏi danh sách yêu thích
      removeItemFromWishlist({ customerId: user._id, productId: product._id });
      setFavorites((prev) => ({ ...prev, [product._id]: false }));
    } else {
      // Thêm sản phẩm vào danh sách yêu thích
      addItemToWishlist({ customerId: user._id, productId: product._id });
      setFavorites((prev) => ({ ...prev, [product._id]: true }));
    }

    // Cập nhật trạng thái yêu thích của sản phẩm
    setIsFavorite(!isFavorite);
  };

  return (
    <Card
      sx={{
        maxWidth: 264,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        height: "525px",
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
            width: 264,
            height: 264,
            objectFit: "contain",
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
            <Typography variant="h6">{product.productName}</Typography>
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
          onClick={handleFavoriteClick}
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
