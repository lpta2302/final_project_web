import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Grid2, Box, Paper, Button, CircularProgress, IconButton, TextField, Breadcrumbs, Link, Rating
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { useParams } from 'react-router-dom';

const Product = () => {
  const { productId } = useParams();
  
  const [productData, setProductData] = useState({
    id: productId,
    title: 'Sản phẩm mẫu',
    description: 'Mô tả sản phẩm.',
    price: 199.99,
    imageUrl: 'https://via.placeholder.com/300',
    stock: 10,
    rating: 4.2,
  });
  
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [ratingValue, setRatingValue] = useState(productData.rating);

  // State quản lý đánh giá người dùng
  const [userComments, setUserComments] = useState([]);
  const [newComment, setNewComment] = useState({
    name: '',
    comment: '',
    rating: 0,
  });

  // Tính toán điểm trung bình của đánh giá
  const calculateAverageRating = () => {
    if (userComments.length === 0) return 0;
    const totalRating = userComments.reduce((sum, comment) => sum + comment.rating, 0);
    return totalRating / userComments.length;
  };

  useEffect(() => {
    // Giả lập dữ liệu đánh giá từ cơ sở dữ liệu
    const fetchedComments = [
      { name: 'John', comment: 'Sản phẩm rất tốt!', rating: 5 },
      { name: 'Jane', comment: 'Giá cả hợp lý, chất lượng ổn.', rating: 4 },
    ];
    setUserComments(fetchedComments);
  }, []);

  // Xử lý form comment
  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setNewComment({
      ...newComment,
      [name]: value
    });
  };

  const handleSubmitComment = () => {
    // Gửi đánh giá (giả lập lưu trữ)
    if (newComment.name && newComment.comment && newComment.rating) {
      setUserComments([...userComments, newComment]);
      setNewComment({ name: '', comment: '', rating: 0 });
      console.log("Comment", newComment.name, newComment.comment, newComment.rating);
    }
  };

  // Xử lý tăng giảm số lượng sản phẩm
  const handleIncrease = () => {
    if (quantity < productData.stock) setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  const averageRating = calculateAverageRating();

  return (
    <Container>
      {/* Breadcrumb Navigation */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 2 }}>
        <Link underline="hover" color="inherit" href="/">
          Trang chủ
        </Link>
        <Link underline="hover" color="inherit" href="/products">
          Sản phẩm
        </Link>
        <Typography color="text.primary">{productData.title}</Typography>
      </Breadcrumbs>

      <Paper elevation={3} sx={{ padding: 4, mt: 2 }}>
        <Grid2 container spacing={4}>
          {/* Product Image */}
          <Grid2 xs={12} md={6}>
            <img
              src={productData.imageUrl}
              alt={productData.title}
              style={{ width: "100%", borderRadius: "8px" }}
            />
          </Grid2>

          {/* Product Details */}
          <Grid2 xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              {productData.title}
            </Typography>
            <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
              ${productData.price.toFixed(2)}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              {productData.description}
            </Typography>

            {/* Hiển thị điểm trung bình đánh giá */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography variant="body1" sx={{ mr: 2 }}>
                Đánh giá trung bình: {averageRating.toFixed(1)}
              </Typography>
              <Rating
                name="average-rating"
                value={averageRating}
                precision={0.5}
                readOnly
              />
            </Box>

            {/* Quantity Selector */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
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
                disabled={quantity >= productData.stock}
              >
                <Add />
              </IconButton>
            </Box>

            {/* Stock Status */}
            <Typography
              variant="body2"
              color={productData.stock > 0 ? "green" : "red"}
            >
              {productData.stock > 0
                ? `Còn hàng: ${productData.stock} sản phẩm`
                : "Hết hàng"}
            </Typography>

            {/* Add to Cart Button */}
            {productData.stock > 0 && (
              <Button variant="contained" color="primary" sx={{ mt: 3 }}>
                Thêm vào giỏ hàng
              </Button>
            )}
          </Grid2>
        </Grid2>
      </Paper>

      {/* Comment Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Đánh giá
        </Typography>

        {/* Comment Input - Hiển thị form nhập trước */}
        <Box sx={{ mt: 3 }}>
          <TextField
            label="Tên của bạn"
            name="name"
            value={newComment.name}
            onChange={handleCommentChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Rating
            name="rating"
            value={newComment.rating}
            onChange={(event, newValue) => {
              setNewComment({ ...newComment, rating: newValue });
            }}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Nhận xét của bạn"
            name="comment"
            value={newComment.comment}
            onChange={handleCommentChange}
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitComment}
            sx={{ mb: 2 }}
          >
            Gửi đánh giá
          </Button>
        </Box>

        {/* Display Existing Comments */}
        {userComments.length > 0 ? (
          userComments.map((comment, index) => (
            <Paper key={index} sx={{ p: 2, mb: 2 }}>
              <Typography variant="body1">
                <strong>{comment.name}</strong> - {comment.rating} 
                <Rating
                  name="comment-rating"
                  value={comment.rating}
                  precision={0.5}
                  readOnly
                />
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {comment.comment}
              </Typography>
            </Paper>
          ))
        ) : (
          <Typography variant="body2">Chưa có đánh giá nào</Typography>
        )}
      </Box>

      {/* Related Products (Placeholder for future products) */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          Sản phẩm liên quan
        </Typography>
        <Grid2 container spacing={2}>
          {/* Placeholder for related products */}
          <Grid2 xs={12} sm={4}>
            <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6">Sản phẩm A</Typography>
              <img
                src="https://via.placeholder.com/150"
                alt="Related Product A"
                style={{ width: "100%", borderRadius: "8px" }}
              />
              <Button variant="outlined" color="primary" sx={{ mt: 1 }}>
                Xem sản phẩm
              </Button>
            </Paper>
          </Grid2>
          <Grid2 xs={12} sm={4}>
            <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6">Sản phẩm B</Typography>
              <img
                src="https://via.placeholder.com/150"
                alt="Related Product B"
                style={{ width: "100%", borderRadius: "8px" }}
              />
              <Button variant="outlined" color="primary" sx={{ mt: 1 }}>
                Xem sản phẩm
              </Button>
            </Paper>
          </Grid2>
          <Grid2 xs={12} sm={4}>
            <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="h6">Sản phẩm C</Typography>
              <img
                src="https://via.placeholder.com/150"
                alt="Related Product C"
                style={{ width: "100%", borderRadius: "8px" }}
              />
              <Button variant="outlined" color="primary" sx={{ mt: 1 }}>
                Xem sản phẩm
              </Button>
            </Paper>
          </Grid2>
        </Grid2>
      </Box>
    </Container>
  );
};

export default Product;