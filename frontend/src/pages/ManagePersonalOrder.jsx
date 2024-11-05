import React, { useState } from 'react';
import { Container, Typography, Tabs, Tab, Box, List, ListItem, ListItemText, Button, Paper, Grid, Avatar } from '@mui/material';
import { useAuthContext } from '../context/AuthContext';  // Import AuthContext
import { useReadAllOrdersOfUser } from '../api/queries';
import moment from 'moment';

const ManagePersonalOrder = () => {
  const { user } = useAuthContext();  // Lấy user từ AuthContext
  const userId = user?._id;  // Đảm bảo userId có giá trị

  const [currentTab, setCurrentTab] = useState(0);
  const { data: ordersData, isLoading, isError } = useReadAllOrdersOfUser(userId);

  // Sắp xếp các đơn hàng theo trạng thái
  const processingOrders = ordersData?.filter(order => order.processStatus === "pending") || [];
  const completedOrders = ordersData?.filter(order => order.processStatus === "completed") || [];
  const canceledOrders = ordersData?.filter(order => order.processStatus === "canceled") || [];

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const renderCartItems = (cartItems) => {
    if (!cartItems || cartItems.length === 0) {
      return <Typography>Không có sản phẩm nào trong giỏ hàng.</Typography>;
    }

    return (
      <List>
        {cartItems.map((item, index) => {
          const product = item.spec?.product;  // Truy cập `product` trong `spec`
          
          return (
            <ListItem key={item._id || index}>
              <Avatar src={product?.image} alt={product?.name || "Ảnh sản phẩm"} sx={{ width: 40, height: 40, mr: 2 }} />
              <ListItemText
                primary={`Sản phẩm: ${product?.name || "Tên không có sẵn"}`}  // Hiển thị tên sản phẩm từ `product`
                secondary={`Số lượng: ${item.quantity}`}
              />
            </ListItem>
          );
        })}
      </List>
    );
  };

  const renderOrders = (orders) => {
    if (orders.length === 0) {
      return <Typography>Không có đơn hàng nào.</Typography>;
    }

    return (
      <List>
        {orders.map((order) => {
          const formattedDate = moment(order.createdAt).format('DD-MM-YYYY');
          const displayTotal = `${(order.totalAmount - order.discountAmount + order.shippingCost).toLocaleString()} VND`;

          const statusLabels = {
            completed: 'Đã giao hàng',
            pending: 'Đang xử lý',
            canceled: 'Đã hủy',
          };
          const statusStyles = {
            completed: { backgroundColor: 'lightgreen', color: 'darkgreen' },
            pending: { backgroundColor: 'lightyellow', color: 'goldenrod' },
            canceled: { backgroundColor: '#ffcccb', color: '#b22222' },
          };

          // Kiểm tra nếu `cartItems` tồn tại và có ít nhất một phần tử
          const firstCartItem = order.cart?.cartItems?.[0];
          const product = firstCartItem?.spec?.product;
          const remainingProductCount = (order.cart?.cartItems?.length || 0) - 1;

          return (
            <Paper key={order._id} sx={{ mb: 2, p: 2 }} elevation={10}>
              <ListItem>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                  <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
                    <Avatar src={product?.image} alt={product?.name || "Ảnh sản phẩm"} sx={{ width: 60, height: 60, mb: 1 }} />
                    <ListItemText
                      primary={`Sản phẩm: ${product?.name || "Tên không có sẵn"}`}
                      secondary={
                        remainingProductCount > 0
                          ? `và ${remainingProductCount} sản phẩm khác`
                          : ''
                      }
                    />
                    <Typography variant="body2" color="text.secondary">
                      Ngày đặt hàng: {formattedDate}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Tổng cộng: {displayTotal}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
                    <Typography
                      variant="body2"
                      sx={{
                        ...statusStyles[order.processStatus],
                        borderRadius: '4px',
                        p: 0.5,
                        fontWeight: 'bold',
                        display: 'inline-block',
                        mt: 1,
                      }}
                    >
                      {statusLabels[order.processStatus]}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
                    <Button fullWidth variant="outlined" color="primary" sx={{ mb: 1 }}>
                      Xem chi tiết
                    </Button>
                    {currentTab === 0 && (
                      <Button fullWidth variant="outlined" color="error">
                        Hủy đơn hàng
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </ListItem>

              {/* Hiển thị chi tiết các sản phẩm trong giỏ hàng */}
              <Box mt={2}>
                {renderCartItems(order.cart?.cartItems)}
              </Box>
            </Paper>
          );
        })}
      </List>
    );
  };

  if (isLoading) {
    return <Typography>Đang tải...</Typography>;
  }

  if (isError) {
    return <Typography>Có lỗi xảy ra trong quá trình tải đơn hàng.</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ mb: 4, mt: 4 }}>Quản lý đơn hàng</Typography>
      <Tabs value={currentTab} onChange={handleTabChange} centered>
        <Tab label="Đơn hàng đang xử lý" />
        <Tab label="Đơn hàng đã mua" />
        <Tab label="Đơn hàng đã hủy" />
      </Tabs>

      <Box sx={{ mt: 4 }}>
        {currentTab === 0 && renderOrders(processingOrders)}
        {currentTab === 1 && renderOrders(completedOrders)}
        {currentTab === 2 && renderOrders(canceledOrders)}
      </Box>
    </Container>
  );
};

export default ManagePersonalOrder;
