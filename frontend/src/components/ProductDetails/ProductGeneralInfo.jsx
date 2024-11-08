import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Rating, IconButton, TextField } from "@mui/material";
import { Add, Remove, Favorite, FavoriteBorder } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { useReadAllReviewsAdmin, useReadProductDetailBySlug } from "../../api/queries";

const ProductGeneralInfo = () => {
  const { slug } = useParams();
  
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);
  const [activeSpec, setActiveSpec] = useState(null);
  const [selectedSpec, setSelectedSpec] = useState(null);

  const { data: productData } = useReadProductDetailBySlug(slug);
  const { data: productReview } = useReadAllReviewsAdmin();

  const product = productData || null;
  const specs = Array.isArray(product?.specs) ? product.specs : [];
  const filteredReviews = Array.isArray(productReview)
    ? productReview.filter((review) => review.spec === specs?._id)
    : [];

  useEffect(() => {
    if (specs && specs.length > 0) {
      setSelectedSpec(specs[0]);
      setActiveSpec(specs[0]._id);
    }
  }, [specs]);

  const handleSpecChange = (spec) => {
    setSelectedSpec(spec);
    setQuantity(1);
    setActiveSpec(spec._id);
  };

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const totalStars = reviews.reduce((sum, review) => sum + review.star, 0);
    return totalStars / reviews.length;
  };

  const handleIncrease = () => {
    if (selectedSpec && quantity < selectedSpec.stockQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="h6" gutterBottom>
          {product.productName}
        </Typography>
        <IconButton onClick={toggleFavorite} sx={{ ml: 2, color: "red" }}>
          {isFavorited ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Rating
          value={calculateAverageRating(filteredReviews)}
          precision={0.5}
          readOnly
        />
        <Typography variant="body2" sx={{ ml: 1 }}>
          ({filteredReviews?.length || 0} đánh giá)
        </Typography>
      </Box>
      <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
        Chọn cấu hình:
      </Typography>
      {Array.isArray(specs) &&
        specs.map((spec) => {
          const storageSpec = spec.specifications.find(
            (s) => s.key === "671f02986fb968f4d374e5ce"
          );
          const storageCapacity = storageSpec ? storageSpec.value : "N/A";
          const originalPrice = spec.price;
          const discountPrice = originalPrice * (1 - (product.specs.discountPercentage || 0) / 100);
          
          return (
            <Button
              key={spec._id}
              variant="outlined"
              onClick={() => handleSpecChange(spec)}
              sx={{
                mb: 1,
                mr: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: 300,
                borderRadius: 4,
                borderColor: activeSpec === spec._id ? "red" : "grey.500",
                color: activeSpec === spec._id ? "red" : "inherit",
                flexDirection: "column",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Typography variant="body2">
                  {spec.specificationName}
                </Typography>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {storageCapacity}
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                {product.discountPercentage > 0 && (
                  <Typography
                    variant="body2"
                    sx={{
                      textDecoration: "line-through",
                      fontSize: "0.9rem",
                    }}
                  >
                    ${originalPrice}
                  </Typography>
                )}
                <Typography
                  variant="body2"
                  sx={{ fontSize: "1rem", fontWeight: "bold" }}
                >
                  ${discountPrice.toFixed(2)}
                </Typography>
              </div>
            </Button>
          );
        })}
      <Typography>
        {selectedSpec && selectedSpec.discountPercentage > 0 ? (
          <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
            {/* Giá giảm */}
            <Typography
              sx={{
                fontWeight: "bold",
                color: "red",
                fontSize: "1.5rem",
                mr: 2,
              }}
            >
              $
              {selectedSpec.price * (1 - selectedSpec.discountPercentage / 100)}
            </Typography>

            {/* Giá gốc */}
            <Typography
              sx={{
                textDecoration: "line-through",
                color: "gray",
                fontSize: "1rem",
              }}
            >
              ${selectedSpec.price}
            </Typography>
          </Box>
        ) : selectedSpec ? (
          // Nếu không có giảm giá, chỉ hiển thị giá gốc
          <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
            <Typography
              sx={{
                fontWeight: "bold",
                color: "red",
                fontSize: "1.5rem",
                mr: 2,
              }}
            >
              ${selectedSpec.price}
            </Typography>
          </Box>
        ) : null}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
        <Typography variant="body1" sx={{ mr: 2 }}>
          Số lượng:
        </Typography>
        <IconButton onClick={handleDecrease} disabled={quantity <= 1}>
          <Remove />
        </IconButton>
        <TextField
          value={quantity}
          size="small"
          sx={{ width: "50px", textAlign: "center" }}
          inputProps={{ style: { textAlign: "center" } }}
          disabled
        />
        <IconButton
          onClick={handleIncrease}
          disabled={selectedSpec && quantity >= selectedSpec.stockQuantity}
        >
          <Add />
        </IconButton>
      </Box>
      <Typography
        variant="body2"
        color={selectedSpec && selectedSpec.stockQuantity > 0 ? "green" : "red"}
        sx={{ mt: 1 }}
      >
        {selectedSpec && selectedSpec.stockQuantity > 0
          ? `Còn ${selectedSpec.stockQuantity} sản phẩm`
          : "Hết hàng"}
      </Typography>
      {selectedSpec && selectedSpec.stockQuantity > 0 && (
        <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
          <Button variant="contained" color="primary">
            Thêm vào giỏ hàng
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ProductGeneralInfo;
