import React, { useState } from "react";
import {
  Grid,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Divider,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LaptopIcon from "@mui/icons-material/Laptop";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import PeopleIcon from "@mui/icons-material/People";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const CustomerProfile = () => {
  const [activeComponent, setActiveComponent] = useState("MyProfile");
  const [countryCode, setCountryCode] = useState("");

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  const renderContent = () => {
    switch (activeComponent) {
      case "MyProfile":
        return <ProfileForm />;
      case "Favorite":
        return <FavoritePage />;
      case "SeenProduct":
        return <SeenProductPage />;
      case "OrderManagement":
        return <OrderManagementPage />;
      default:
        return <ProfileForm />;
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#ffffff",
        color: "#0672cb",
      }}
    >
      {/* Side Menu */}
      <Box
        sx={{
          width: "250px",
          backgroundColor: "#0672cb",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <List>
          <ListItem button onClick={() => handleComponentChange("MyProfile")}>
            <ListItemIcon>
              <AccountCircleIcon sx={{ color: "#ffffff" }} />
            </ListItemIcon>
            <ListItemText primary="My Profile" sx={{ color: "#ffffff" }} />
          </ListItem>
          <Divider sx={{ backgroundColor: "#ffffff" }} />
          <ListItem button onClick={() => handleComponentChange("Favorite")}>
            <ListItemIcon>
              <LaptopIcon sx={{ color: "#ffffff" }} />
            </ListItemIcon>
            <ListItemText primary="Favorite" sx={{ color: "#ffffff" }} />
          </ListItem>
          <Divider sx={{ backgroundColor: "#ffffff" }} />
          <ListItem button onClick={() => handleComponentChange("SeenProduct")}>
            <ListItemIcon>
              <AssignmentTurnedInIcon sx={{ color: "#ffffff" }} />
            </ListItemIcon>
            <ListItemText primary="Seen Product" sx={{ color: "#ffffff" }} />
          </ListItem>
          <Divider sx={{ backgroundColor: "#ffffff" }} />
          <ListItem
            button
            onClick={() => handleComponentChange("OrderManagement")}
          >
            <ListItemIcon>
              <PeopleIcon sx={{ color: "#ffffff" }} />
            </ListItemIcon>
            <ListItemText
              primary="Order Management"
              sx={{ color: "#ffffff" }}
            />
          </ListItem>
          <Divider sx={{ backgroundColor: "#ffffff" }} />
          <ListItem button>
            <ListItemIcon>
              <ExitToAppIcon sx={{ color: "#ffffff" }} />
            </ListItemIcon>
            <ListItemText primary="Sign Out" sx={{ color: "#ffffff" }} />
          </ListItem>
        </List>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, padding: "40px" }}>
        <Paper
          elevation={3}
          sx={{
            padding: "30px",
            backgroundColor: "#ffffff",
            color: "#0672cb",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ color: "#0672cb" }}>
            Profile
          </Typography>
          {renderContent()}
        </Paper>
      </Box>
    </Box>
  );
};

const ProfileForm = () => {
  const [countryCode, setCountryCode] = useState("");

  return (
    <Box component="form" sx={{ mt: 2 }}>
      <TextField
        label="First Name"
        fullWidth
        variant="outlined"
        defaultValue="Trung"
        sx={{
          mb: 2,
          "& .MuiInputBase-input": { color: "#000" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#505050",
            },
          },
        }}
        InputLabelProps={{ shrink: true, sx: { color: "#505050" } }}
      />
      <TextField
        label="Last Name"
        fullWidth
        variant="outlined"
        defaultValue="Phạm"
        sx={{
          mb: 2,
          "& .MuiInputBase-input": { color: "#000" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#505050",
            },
          },
        }}
        InputLabelProps={{ shrink: true, sx: { color: "#505050" } }}
      />
      <TextField
        label="Region/Country"
        fullWidth
        variant="outlined"
        defaultValue="Vietnam"
        sx={{
          mb: 2,
          "& .MuiInputBase-input": { color: "#000" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#505050",
            },
          },
        }}
        InputLabelProps={{ shrink: true, sx: { color: "#505050" } }}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        variant="outlined"
        defaultValue="••••••••"
        sx={{
          mb: 2,
          "& .MuiInputBase-input": { color: "#000" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#505050",
            },
          },
        }}
        InputLabelProps={{ shrink: true, sx: { color: "#505050" } }}
      />
      <TextField
        label="Email"
        fullWidth
        variant="outlined"
        defaultValue="lcdangchet@gmail.com"
        sx={{
          mb: 2,
          "& .MuiInputBase-input": { color: "#000" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#505050",
            },
          },
        }}
        InputLabelProps={{ shrink: true, sx: { color: "#505050" } }}
      />
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel sx={{ color: "#000" }}>Country Code</InputLabel>
        <Select
          value={countryCode}
          label="Country Code"
          onChange={(e) => setCountryCode(e.target.value)}
          sx={{
            "& .MuiInputBase-input": { color: "#000" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#505050 ",
              },
            },
          }}
        >
          <MenuItem value={1}>+1</MenuItem>
          <MenuItem value={84}>+84</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Telephone Number"
        fullWidth
        variant="outlined"
        sx={{
          mb: 2,
          "& .MuiInputBase-input": { color: "#000" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#505050",
            },
          },
        }}
        InputLabelProps={{ shrink: true, sx: { color: "#505050" } }}
      />
      <Button
        sx={{
          backgroundColor: "#0672cb",
          color: "#fff",

          "&:hover": {
            backgroundColor: "#005a9c", // Màu tối hơn khi hover
          },
        }}
      >
        Lưu
      </Button>
    </Box>
  );
};
const FavoritePage = () => (
  <Box>
    <Typography variant="h5">Favorite Products</Typography>
    {/* Add your favorite products UI here */}
  </Box>
);

const SeenProductPage = () => (
  <Box>
    <Typography variant="h5">Seen Products</Typography>
    {/* Add your seen products UI here */}
  </Box>
);

const OrderManagementPage = () => (
  <Box>
    <Typography variant="h5">Order Management</Typography>
    {/* Add your order management UI here */}
  </Box>
);
export default CustomerProfile;
