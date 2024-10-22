import React from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

function Profile() {
    return (
      <Container>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Profile
        </Typography>
        <List>
          <ListItem button="true" component={Link} to="/manage-profile">
            <ListItemText primary="Manage Profile" />
          </ListItem>
          <ListItem button="true" component={Link} to="/manage-order">
            <ListItemText primary="Manage Orders" />
          </ListItem>
          <ListItem button="true" component={Link} to="/favorite">
            <ListItemText primary="Favorite Products" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Recently Seen Products" />
          </ListItem>
        </List>
      </Container>
    );
}

export default Profile