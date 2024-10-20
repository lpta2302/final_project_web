import React, { useState } from 'react';
import { Container, Typography, Tabs, Tab, Box } from '@mui/material';

const ManagePersonalOrder = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
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
        {currentTab === 0 && <Typography>Hiển thị đơn hàng đang xử lý</Typography>}
        {currentTab === 1 && <Typography>Hiển thị đơn hàng đã mua</Typography>}
        {currentTab === 2 && <Typography>Hiển thị đơn hàng đã hủy</Typography>}
      </Box>
    </Container>
  );
}

export default ManagePersonalOrder
