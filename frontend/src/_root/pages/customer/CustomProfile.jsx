import React, { useState } from "react";
import {
  Grid,
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const CustomerProfile = () => {
  const [activeComponent, setActiveComponent] = useState(
    "ManagePersonalProfile"
  );

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  const renderContent = () => {
    switch (activeComponent) {
      case "ManagePersonalProfile":
        return <ManagePersonalProfile />;
      case "ManagePersonalOrder":
        return <ManagePersonalOrder />;
      case "Favorite":
        return <Favorite />;
      case "SeenProduct":
        return <SeenProduct />;
      default:
        return <ManagePersonalProfile />;
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        color: "#0672cb",
        p: 3,
        minHeight: "100vh",
        display: "flex", // Flex container
        justifyContent: "center", // Horizontally center
        alignItems: "center", // Vertically center
      }}
    >
      <Box sx={{ width: "80%", maxWidth: "1200px" }}>
        {" "}
        {/* Container Width */}
        <Typography variant="h4" gutterBottom sx={{ color: "#0672cb" }}>
          Customer Profile
        </Typography>
        <Grid container spacing={3}>
          {/* Vertical List on the Left */}
          <Grid item xs={3}>
            <List
              sx={{
                backgroundColor: "#0672cb",
                color: "white",
                p: 2,
                borderRadius: 2,
              }}
            >
              <ListItem
                button
                onClick={() => handleComponentChange("ManagePersonalProfile")}
              >
                <ListItemText
                  primary="Manage Personal Profile"
                  sx={{ color: "white" }}
                />
              </ListItem>
              <ListItem
                button
                onClick={() => handleComponentChange("ManagePersonalOrder")}
              >
                <ListItemText
                  primary="Manage Personal Orders"
                  sx={{ color: "white" }}
                />
              </ListItem>
              <ListItem
                button
                onClick={() => handleComponentChange("Favorite")}
              >
                <ListItemText primary="Favorite" sx={{ color: "white" }} />
              </ListItem>
              <ListItem
                button
                onClick={() => handleComponentChange("SeenProduct")}
              >
                <ListItemText primary="Seen Products" sx={{ color: "white" }} />
              </ListItem>
            </List>
          </Grid>

          {/* Content on the Right */}
          <Grid item xs={9}>
            <Paper
              sx={{
                p: 3,
                backgroundColor: "white",
                border: "1px solid #0672cb",
              }}
            >
              {renderContent()}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

// ManagePersonalProfile Component with a form to update user info
const ManagePersonalProfile = () => (
  <>
    <Typography variant="h6" sx={{ color: "#0672cb" }}>
      Manage Personal Profile
    </Typography>
    <Box component="form" sx={{ mt: 2 }}>
      <TextField label="Name" fullWidth sx={{ mb: 2 }} />
      <TextField label="Email" fullWidth sx={{ mb: 2 }} />
      <TextField label="Phone" fullWidth sx={{ mb: 2 }} />
      <Button
        variant="contained"
        sx={{ backgroundColor: "#0672cb", color: "white" }}
      >
        Update Profile
      </Button>
    </Box>
  </>
);

// ManagePersonalOrder Component with table showing orders
const ManagePersonalOrder = () => (
  <>
    <Typography variant="h6" sx={{ color: "#0672cb" }}>
      Manage Personal Orders
    </Typography>
    <TableContainer
      component={Paper}
      sx={{ mt: 2, border: "1px solid #0672cb" }}
    >
      <Table>
        <TableHead sx={{ backgroundColor: "#0672cb" }}>
          <TableRow>
            <TableCell sx={{ color: "white" }}>Order ID</TableCell>
            <TableCell sx={{ color: "white" }}>Status</TableCell>
            <TableCell sx={{ color: "white" }}>Date</TableCell>
            <TableCell sx={{ color: "white" }}>Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Example data */}
          <TableRow>
            <TableCell>#12345</TableCell>
            <TableCell>Processed</TableCell>
            <TableCell>2024-10-01</TableCell>
            <TableCell>$150</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>#12346</TableCell>
            <TableCell>Canceled</TableCell>
            <TableCell>2024-09-20</TableCell>
            <TableCell>$80</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </>
);

// Favorite Component showing favorite products
const Favorite = () => (
  <>
    <Typography variant="h6" sx={{ color: "#0672cb" }}>
      Favorite Products
    </Typography>
    <ul style={{ marginTop: "16px", color: "#0672cb" }}>
      <li>Product 1 - $20</li>
      <li>Product 2 - $35</li>
      <li>Product 3 - $50</li>
    </ul>
  </>
);

// SeenProduct Component showing recently seen products
const SeenProduct = () => (
  <>
    <Typography variant="h6" sx={{ color: "#0672cb" }}>
      Seen Products
    </Typography>
    <ul style={{ marginTop: "16px", color: "#0672cb" }}>
      <li>Product A - $40</li>
      <li>Product B - $60</li>
      <li>Product C - $120</li>
    </ul>
  </>
);

export default CustomerProfile;
