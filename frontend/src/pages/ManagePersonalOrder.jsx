import React, { useState } from 'react';
import { Container, Typography, Tabs, Tab, Box, List, ListItem, ListItemText, Button, Paper, Grid } from '@mui/material';

const sampleOrders = {
  processing: [
    { id: 1, orderCode: 'DH001', date: '10-01-2024', total: '500,000 VND', status: 'Đang xử lý', products: ['Sản phẩm A', 'Sản phẩm B', 'Sản phẩm C'] },
    { id: 2, orderCode: 'DH002', date: '12-01-2024', total: '1,200,000 VND', status: 'Đang xử lý', products: ['Sản phẩm D'] }
  ],
  purchased: [
    { id: 3, orderCode: 'DH003', date: '12-10-2023', total: '2,000,000 VND', status: 'Đã giao hàng', products: ['Sản phẩm E', 'Sản phẩm F'] }
  ],
  cancelled: [
    { id: 4, orderCode: 'DH004', date: '05-12-2023', total: '300,000 VND', status: 'Đã hủy', products: ['Sản phẩm G'] }
  ]
};

const ManagePersonalOrder = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const renderOrders = (orders) => {
    if (orders.length === 0) {
      return <Typography>Không có đơn hàng nào.</Typography>;
    }

    return (
      <List>
        {orders.map((order) => {
          const { products, date } = order;
          const displayProduct = products[0];
          const additionalProductsCount = products.length > 1 ? `và ${products.length - 1} sản phẩm khác` : '';

          const statusStyles = {
            'Đã giao hàng': { backgroundColor: 'lightgreen', color: 'darkgreen' },
            'Đang xử lý': { backgroundColor: 'lightyellow', color: 'goldenrod' },
            'Đã hủy': { backgroundColor: '#ffcccb', color: '#b22222' }
          };

          return (
            <Paper key={order.id} sx={{ mb: 2, p: 2 }} elevation={10}>
              <ListItem>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                  {/* Product Info */}
                  <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
                    <ListItemText
                      primary={displayProduct}
                      secondary={additionalProductsCount}
                    />
                  </Grid>
                  
                  {/* Date and Status */}
                  <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      {date}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        ...statusStyles[order.status],
                        borderRadius: '4px',
                        p: 0.5,
                        fontWeight: 'bold',
                        display: 'inline-block',
                        mt: 1,
                      }}
                    >
                      {order.status}
                    </Typography>
                  </Grid>
                  
                  {/* Action Buttons */}
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

  return (
    <Container maxWidth="md">
      <Typography variant="h4" sx={{ mb: 4, mt: 4 }}>Quản lý đơn hàng</Typography>
      <Tabs value={currentTab} onChange={handleTabChange} centered>
        <Tab label="Đơn hàng đang xử lý" />
        <Tab label="Đơn hàng đã mua" />
        <Tab label="Đơn hàng đã hủy" />
      </Tabs>

      <Box sx={{ mt: 4 }}>
        {currentTab === 0 && renderOrders(sampleOrders.processing)}
        {currentTab === 1 && renderOrders(sampleOrders.purchased)}
        {currentTab === 2 && renderOrders(sampleOrders.cancelled)}
      </Box>
    </Container>
  );
}

export default ManagePersonalOrder;
