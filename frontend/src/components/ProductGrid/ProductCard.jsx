import React, { useState, useEffect } from "react";
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
  useGetCurrentUser, // Hook để lấy thông tin người dùng hiện tại
} from "../../api/queries";

const ProductCard = ({ product }) => {
  const { isAuthenticated, user } = useAuthContext();

  // Lấy thông tin người dùng hiện tại từ React Query
  const { data: currentUser, isLoading, error } = useGetCurrentUser();

  const [isFavorite, setIsFavorite] = useState(false);

  const { mutate: addItemToWishlist } = useAddItemToWishlist();
  const { mutate: removeItemFromWishlist } = useRemoveItemFromWishlist();

  useEffect(() => {
    if (currentUser) {
      // Kiểm tra xem sản phẩm có trong danh sách yêu thích của người dùng không
      setIsFavorite(currentUser.wishlist.includes(product._id));
    }
  }, [currentUser, product._id]);

  const handleFavoriteClick = () => {
    if (!isAuthenticated) {
      window.location.href = "/login";
      return;
    }

    if (isFavorite) {
      // Xóa sản phẩm khỏi danh sách yêu thích
      removeItemFromWishlist({ customerId: user._id, productId: product._id });
    } else {
      // Thêm sản phẩm vào danh sách yêu thích
      addItemToWishlist({ customerId: user._id, productId: product._id });
    }

    // Cập nhật trạng thái yêu thích
    setIsFavorite(!isFavorite);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading user information</div>;
  }

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
