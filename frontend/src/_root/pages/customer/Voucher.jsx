import React from 'react';
import { Container, Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import { useReadAllVouchers } from '../../../api/queries';
import { Link } from 'react-router-dom';

const Voucher = () => {
  const { data: vouchers, isLoading, isError, error } = useReadAllVouchers();

  if (isLoading) {
    return (
      <Container maxWidth="sm">
        <CircularProgress />
        <Typography variant="h6" align="center" sx={{ mt: 2 }}>
          Đang tải dữ liệu...
        </Typography>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h6" color="error" align="center">
          {error.message}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom align="center">
        Danh sách Voucher
      </Typography>
      <List>
        {vouchers.map((voucher) => (
          <ListItem key={voucher._id} button component={Link} to={`/voucher/${voucher._id}`}>
            <ListItemText primary={voucher.voucherName} secondary={`Giảm giá: ${voucher.discountPercentage}%`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Voucher;
