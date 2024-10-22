import React, { useState } from 'react';
import { Container, Typography, Tabs, Tab, Box, ListItem, ListItemText, Button, Paper, Grid } from '@mui/material';

const sampleOrders = {
  processing: [
    { id: 1, orderCode: 'DH001', date: '2024-01-10', total: '500,000 VND', status: 'Đang xử lý', products: ['Sản phẩm A', 'Sản phẩm B', 'Sản phẩm C'] },
    { id: 2, orderCode: 'DH002', date: '2024-01-12', total: '1,200,000 VND', status: 'Đang xử lý', products: ['Sản phẩm D'] }
  ],
  purchased: [
    { id: 3, orderCode: 'DH003', date: '2023-12-10', total: '2,000,000 VND', status: 'Đã giao hàng', products: ['Sản phẩm E', 'Sản phẩm F'] }
  ],
  cancelled: [
    { id: 4, orderCode: 'DH004', date: '2023-12-05', total: '300,000 VND', status: 'Đã hủy', products: ['Sản phẩm G'] }
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
      <Grid container spacing={2}>
        {orders.map((order) => {
          const { products, date } = order;
          const displayProduct = products[0];
          const additionalProductsCount = products.length > 1 ? `và ${products.length - 1} sản phẩm khác` : ' ';

          const statusStyles = {
            'Đã giao hàng': { backgroundColor: 'lightgreen', color: 'darkgreen' },
            'Đang xử lý': { backgroundColor: 'lightyellow', color: 'goldenrod' },
            'Đã hủy': { backgroundColor: '#ffcccb', color: '#b22222' }
          };

          return (
            <Grid item xs={6} key={order.id}>
              <Paper sx={{ p: 2, borderRadius: "16px", height: "100%" }} elevation={10}>
                <ListItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <ListItemText
                    primary={displayProduct}
                    secondary={additionalProductsCount}
                    sx={{ textAlign: 'center' }}
                  />
                  
                  <Grid container justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {date}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          ...statusStyles[order.status],
                          borderRadius: '4px',
                          p: 0.5,
                          fontWeight: 'bold',
                          textAlign: 'center',
                          marginTop: 1,
                          display: 'inline-block',
                        }}
                      >
                        {order.status}
                      </Typography>
                    </Grid>
                  </Grid>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1, width: '100%' }}>
                    <Button variant="outlined" color="primary" sx={{ mr: 1 }}>Xem chi tiết</Button>
                    {currentTab === 0 && <Button variant="outlined" color="error">Hủy đơn hàng</Button>}
                  </Box>
                </ListItem>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
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
