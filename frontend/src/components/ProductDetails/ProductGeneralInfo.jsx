import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Rating,
  IconButton,
  TextField,
} from "@mui/material";
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

  // Lấy specId từ sản phẩm
  const specs = Array.isArray(productData?.specs) ? productData.specs : [];
  const specId = selectedSpec?._id; // specId sẽ lấy từ selectedSpec

  // Fetch các reviews từ API dựa trên specId
  const { data: productReview, isPending: isLoadingReviews } = useReadAllReviewsAdmin(specId);

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
    console.log(reviews);
    
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

  // Tính rating trung bình từ các reviews
  const averageRating = calculateAverageRating(productReview);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {/* Product Name and Favorite Button */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="h5">{productData.productName}</Typography>
        <IconButton onClick={toggleFavorite} sx={{ color: "red" }}>
          {isFavorited ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      </Box>

      {/* Rating */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Rating value={averageRating} readOnly precision={0.5} />
        <Typography variant="body2" sx={{ ml: 1 }}>
          ({productReview?.length || 0} đánh giá)
        </Typography>
      </Box>

      {/* Specification Options */}
      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        Chọn cấu hình:
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        {specs.map((spec) => {
          const storageSpec = spec.specifications.find(
            (s) => s.key === "671f02986fb968f4d374e5ce"
          );
          const storageCapacity = storageSpec ? storageSpec.value : "N/A";
          const originalPrice = spec.price;
          const discountPrice = originalPrice * (1 - (productData.specs.discountPercentage || 0) / 100);

          return (
            <Button
              key={spec._id}
              variant="outlined"
              onClick={() => handleSpecChange(spec)}
              sx={{
                mb: 1,
                mr: 1,
                display: "flex",
                justifyContent: "space-between",
                width: 300,
                borderRadius: 4,
                borderColor: activeSpec === spec._id ? "red" : "grey.500",
                color: activeSpec === spec._id ? "red" : "inherit",
                flexDirection: "column",
                textAlign: "left",
              }}
            >
              <Typography variant="body2">{spec.specificationName}</Typography>
              <Typography variant="body2" sx={{ ml: 1 }}>
                {storageCapacity}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", textAlign: "right" }}>
                {productData.discountPercentage > 0 && (
                  <Typography variant="body2" sx={{ textDecoration: "line-through" }}>
                    ${originalPrice}
                  </Typography>
                )}
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  ${discountPrice.toFixed(2)}
                </Typography>
              </Box>
            </Button>
          );
        })}
      </Box>

      {/* Price Display */}
      <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
        {selectedSpec && selectedSpec.discountPercentage > 0 ? (
          <>
            <Typography variant="h6" sx={{ color: "red", fontWeight: "bold", fontSize: "1.5rem" }}>
              ${selectedSpec.price * (1 - selectedSpec.discountPercentage / 100)}
            </Typography>
            <Typography variant="body2" sx={{ textDecoration: "line-through", color: "gray", ml: 2 }}>
              ${selectedSpec.price}
            </Typography>
          </>
        ) : (
          selectedSpec && (
            <Typography variant="h6" sx={{ color: "red", fontWeight: "bold", fontSize: "1.5rem" }}>
              ${selectedSpec.price}
            </Typography>
          )
        )}
      </Box>

      {/* Quantity Selector */}
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
        <IconButton onClick={handleIncrease} disabled={selectedSpec && quantity >= selectedSpec.stockQuantity}>
          <Add />
        </IconButton>
      </Box>

      {/* Stock Status */}
      <Typography variant="body2" color={selectedSpec && selectedSpec.stockQuantity > 0 ? "green" : "red"} sx={{ mt: 1 }}>
        {selectedSpec && selectedSpec.stockQuantity > 0
          ? `Còn ${selectedSpec.stockQuantity} sản phẩm`
          : "Hết hàng"}
      </Typography>

      {/* Add to Cart Button */}
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
