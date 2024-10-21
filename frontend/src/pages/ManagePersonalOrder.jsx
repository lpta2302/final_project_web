import React, { useState } from 'react';
import { Container, Typography, Tabs, Tab, Box, List, ListItem, ListItemText, Button, Paper } from '@mui/material';

const sampleOrders = {
  processing: [
    { id: 1, orderCode: 'DH001', date: '2024-01-10', total: '500,000 VND', status: 'Đang xử lý' },
    { id: 2, orderCode: 'DH002', date: '2024-01-12', total: '1,200,000 VND', status: 'Đang xử lý' }
  ],
  purchased: [
    { id: 3, orderCode: 'DH003', date: '2023-12-10', total: '2,000,000 VND', status: 'Đã mua' }
  ],
  cancelled: [
    { id: 4, orderCode: 'DH004', date: '2023-12-05', total: '300,000 VND', status: 'Đã hủy' }
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
        {orders.map((order) => (
          <Paper key={order.id} sx={{ mb: 2, p: 2 }}>
            <ListItem>
              <ListItemText
                primary={`Mã đơn hàng: ${order.orderCode}`}
                secondary={`Ngày tạo: ${order.date} - Tổng tiền: ${order.total}`}
              />
              <Typography variant="body2" sx={{ color: order.status === 'Đang xử lý' ? 'primary.main' : 'text.secondary', mr: 2 }}>{order.status}</Typography>
              <Button variant="outlined" color="primary" sx={{ mr: 1 }}>Xem chi tiết</Button>
              {currentTab === 0 && <Button variant="outlined" color="error">Hủy đơn hàng</Button>}
            </ListItem>
          </Paper>
        ))}
      </List>
    );
  };

  return (
    <Container>
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
