import React, { useState } from 'react';
import { Container, Typography, Tabs, Tab, Box, List, ListItem, ListItemText, Button, Paper, Grid } from '@mui/material';
import { useReadAllOrdersOfUser } from '../api/queries'; // Update the import to the correct hook
import moment from 'moment';

const ManagePersonalOrder = ({ userId }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const { data: ordersData, isLoading, isError } = useReadAllOrdersOfUser(userId); // Pass userId

  // Sắp xếp các đơn hàng theo trạng thái
  const processingOrders = ordersData?.filter(order => order.processStatus === "pending") || [];
  const completedOrders = ordersData?.filter(order => order.processStatus === "completed") || [];
  const cancelledOrders = ordersData?.filter(order => order.processStatus === "cancelled") || [];

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  // Hiển thị các đơn hàng theo trạng thái
  const renderOrders = (orders) => {
    if (orders.length === 0) {
      return <Typography>Không có đơn hàng nào.</Typography>;
    }

    return (
      <List>
        {orders.map((order) => {
          const formattedDate = moment(order.takeOrderTime).format('DD-MM-YYYY');
          const displayTotal = `${(order.totalAmount - order.discountAmount + order.shippingCost).toLocaleString()} VND`;

          // Định nghĩa các kiểu trạng thái và kiểu hiển thị
          const statusLabels = {
            completed: 'Đã giao hàng',
            pending: 'Đang xử lý',
            cancelled: 'Đã hủy',
          };
          const statusStyles = {
            completed: { backgroundColor: 'lightgreen', color: 'darkgreen' },
            pending: { backgroundColor: 'lightyellow', color: 'goldenrod' },
            cancelled: { backgroundColor: '#ffcccb', color: '#b22222' },
          };

          return (
            <Paper key={order._id} sx={{ mb: 2, p: 2 }} elevation={10}>
              <ListItem>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                  {/* Thông tin đơn hàng */}
                  <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
                    <ListItemText
                      primary={`Mã đơn hàng: ${order._id}`}
                      secondary={`Ngày đặt hàng: ${formattedDate}`}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Tổng cộng: {displayTotal}
                    </Typography>
                  </Grid>

                  {/* Trạng thái đơn hàng */}
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

                  {/* Nút hành động */}
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
        {currentTab === 2 && renderOrders(cancelledOrders)}
      </Box>
    </Container>
  );
};

export default ManagePersonalOrder;
