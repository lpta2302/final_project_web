import React from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../../context/AuthContext';

function Profile() {
  const { isAuthenticated, isLoading: isLoadingUser , user } = useAuthContext();  
  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 4, mt: 4 }}>
        {!isLoadingUser ? `${user.firstName} ${user.lastName}` : ""}
      </Typography>
      <List>
        <ListItem button="true" component={Link} to="/manage-profile">
          <ListItemText primary="Quản lý hồ sơ" />
        </ListItem>
        <ListItem button="true" component={Link} to="/manage-order">
          <ListItemText primary="Quản lý đơn hàng" />
        </ListItem>
        <ListItem button="true" component={Link} to="/favorite">
          <ListItemText primary="Sản phẩm yêu thích" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Sản phẩm đã xem gần đây" />
        </ListItem>
      </List>
    </Container>
  );
}

export default Profile