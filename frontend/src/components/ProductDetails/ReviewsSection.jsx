import React from 'react';
import { Paper, Typography, Rating, Box } from '@mui/material';
import moment from 'moment';
import { useReadAllReviewsAdmin } from '../../api/queries';

const ReviewsSection= ({}) => {
  const { data: productReview } = useReadAllReviewsAdmin();

  const filteredReviews = Array.isArray(productReview)
    ? productReview.filter((review) => review.spec === specs?._id)
    : [];
  
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Đánh giá sản phẩm
      </Typography>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        {filteredReviews && filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <Paper key={review._id} sx={{ p: 2, mb: 2 }}>
              <Rating value={review.star} readOnly />
              <Typography variant="body2" sx={{ mb: 1 }}>
                {review.description}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {moment(review.createdAt).format("DD/MM/YYYY")}
              </Typography>
            </Paper>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">
            Chưa có đánh giá nào.
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default ReviewsSection;