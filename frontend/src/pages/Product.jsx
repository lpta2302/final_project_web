import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Grid, Box, Paper, Button, CircularProgress, IconButton, TextField, Breadcrumbs, Link, Rating
} from '@mui/material';
import { Add, Remove, Favorite, FavoriteBorder } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useCreateReview, useReadAllProduct, useReadAllReview } from '../api/queries';
import moment from 'moment'; // Để format ngày tháng

const Product = () => {
  const { productId } = useParams();
  
  const { data: productData, isLoading } = useReadAllProduct();
  const { data: productReview, refetch } = useReadAllReview(); // Refetch để cập nhật danh sách sau khi review mới được thêm
  const { mutateAsync: addReview } = useCreateReview();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null); 
  const [isFavorited, setIsFavorited] = useState(false); 
  const [newRating, setNewRating] = useState(0); // Dùng để lưu rating mới từ người dùng
  const [reviewText, setReviewText] = useState(''); // Dùng để lưu nội dung đánh giá mới
  const [isSubmitting, setIsSubmitting] = useState(false); // Trạng thái submit

  const product = productData?.find(item => item._id === productId);
  
  const discountedPrice = product ? product.price * (1 - product.discountPercentage / 100) : 0;

  useEffect(() => {
    if (product && product.imageURLs.length > 0) {
      setSelectedImage(product.imageURLs[0]);
    }
  }, [product]);

  const handleIncrease = () => {
    if (quantity < product.stockQuantity) setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited); 
  };

  if (isLoading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container>
        <Typography variant="h5" sx={{ mt: 4 }}>
          Product not found.
        </Typography>
      </Container>
    );
  }

  // Lọc các review theo productId
  const filteredReviews = productReview?.filter(review => review.spec === productId);

  // Hàm tính rating trung bình
  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const totalStars = reviews.reduce((sum, review) => sum + review.star, 0);
    return totalStars / reviews.length;
  };

  // Hàm xử lý khi người dùng submit review mới
  const handleReviewSubmit = async () => {
    if (newRating === 0 || reviewText.trim() === '') {
      alert('Vui lòng chọn số sao và nhập nội dung đánh giá.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await addReview({
        spec: productId,
        star: newRating,
        description: reviewText,
        createdAt: new Date(),
      });
      setNewRating(0); // Reset rating
      setReviewText(''); // Reset nội dung
      refetch(); // Refetch dữ liệu đánh giá để cập nhật danh sách
    } catch (error) {
      console.error('Error adding review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 2 }}>
        <Link underline="hover" color="inherit" href="/">
          Trang chủ
        </Link>
        <Link underline="hover" color="inherit" href="/products">
          Sản phẩm
        </Link>
        <Typography color="text.primary">{product.productName}</Typography>
      </Breadcrumbs>

      <Paper elevation={3} sx={{ padding: 4, mt: 2 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box position="relative">
              <img
                src={selectedImage || 'https://via.placeholder.com/300'}
                alt={product.productName}
                style={{ width: '100%', borderRadius: '8px' }}
              />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              {product.imageURLs.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Thumbnail ${index}`}
                  onClick={() => setSelectedImage(url)}
                  style={{
                    width: '50px',
                    height: '50px',
                    margin: '0 5px',
                    cursor: 'pointer',
                    border: selectedImage === url ? '2px solid #000' : 'none',
                  }}
                />
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              {product.productName}
            </Typography>
            
            {/* Mã sản phẩm và Rating trung bình */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="body1" sx={{ mr: 2 }}>
                <strong>Mã sản phẩm:</strong> {product.productCode}
              </Typography>
              <Rating value={calculateAverageRating(filteredReviews)} precision={0.5} readOnly />
              <Typography variant="body2" sx={{ ml: 1 }}>
                ({filteredReviews?.length || 0} đánh giá)
              </Typography>
            </Box>
            
            <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
              ${discountedPrice.toFixed(2)}{' '}
              {product.discountPercentage > 0 && (
                <Typography
                  component="span"
                  sx={{ textDecoration: 'line-through', color: 'gray', ml: 2 }}
                >
                  ${product.price.toFixed(2)}
                </Typography>
              )}
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 3 }}>
              {product.description}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Typography variant="body1" sx={{ mr: 2 }}>
                Số lượng:
              </Typography>
              <IconButton onClick={handleDecrease} disabled={quantity <= 1}>
                <Remove />
              </IconButton>
              <TextField
                value={quantity}
                size="small"
                sx={{ width: '50px', textAlign: 'center' }}
                inputProps={{ style: { textAlign: 'center' } }}
                disabled
              />
              <IconButton onClick={handleIncrease} disabled={quantity >= product.stockQuantity}>
                <Add />
              </IconButton>
            </Box>

            <Typography variant="body2" color={product.stockQuantity > 0 ? 'green' : 'red'}>
              {product.stockQuantity > 0
                ? `Còn hàng: ${product.stockQuantity} sản phẩm`
                : 'Hết hàng'}
            </Typography>

            {product.stockQuantity > 0 && (
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
                <Button variant="contained" color="primary">
                  Thêm vào giỏ hàng
                </Button>
                <IconButton onClick={toggleFavorite} sx={{ ml: 2, color: 'red' }}>
                  {isFavorited ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
              </Box>
            )}
          </Grid>
        </Grid>
      </Paper>

      {/* Comment Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Đánh giá sản phẩm
        </Typography>

        {/* Form nhập đánh giá mới */}
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6">Đánh giá của bạn</Typography>
          <Rating
            value={newRating}
            onChange={(event, newValue) => setNewRating(newValue)}
          />
          <TextField
            label="Nhập nội dung đánh giá"
            multiline
            rows={3}
            fullWidth
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleReviewSubmit}
            sx={{ mt: 2 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Đang gửi...' : 'Gửi đánh giá'}
          </Button>
        </Paper>

        {/* Hiển thị các đánh giá */}
        {filteredReviews && filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <Paper key={review._id} sx={{ p: 2, mb: 2 }}>
              <Rating value={review.star} readOnly />
              <Typography variant="body2" sx={{ mb: 1 }}>
                {review.description}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {moment(review.createdAt).format('DD/MM/YYYY')}
              </Typography>
            </Paper>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">
            Chưa có đánh giá nào.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Product;
