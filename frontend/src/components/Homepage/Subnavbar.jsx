import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Stack,
  Typography,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Category as CategoryIcon,
  BrandingWatermark as BrandIcon,
} from "@mui/icons-material";

const SubNavbar = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category}`);
  };

  const handleBrandClick = (brand) => {
    navigate(`/products?brand=${brand}`);
  };

  return (
    <Box
      sx={{
        width: { xs: "100px", sm: "150px", md: "200px" }, // Responsive width cho màn hình nhỏ
        backgroundColor: "#fff",
        borderRight: "1px solid #ddd",
        paddingTop: "10px",
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh", // Full height trên cả trang
        boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
        zIndex: 1000,
        overflowY: "auto", // Thanh cuộn nếu nội dung dài
      }}
    >
      <Stack spacing={3}>
        {/* Danh mục */}
        <Box>
          <Typography
            variant="h6"
            sx={{
              marginLeft: "10px",
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
              fontSize: { xs: "12px", md: "16px" }, // Thay đổi kích thước font theo màn hình
            }}
          >
            <CategoryIcon fontSize="medium" sx={{ marginRight: "5px" }} />
            Danh mục
          </Typography>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleCategoryClick("Laptop")}>
                <ListItemText
                  primary="Laptop"
                  sx={{ fontSize: { xs: "10px", md: "14px" } }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleCategoryClick("Chuột")}>
                <ListItemText
                  primary="Chuột"
                  sx={{ fontSize: { xs: "10px", md: "14px" } }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleCategoryClick("Tai nghe")}>
                <ListItemText
                  primary="Tai nghe"
                  sx={{ fontSize: { xs: "10px", md: "14px" } }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>

        <Divider />

        {/* Thương hiệu */}
        <Box>
          <Typography
            variant="h6"
            sx={{
              marginLeft: "10px",
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
              fontSize: { xs: "12px", md: "16px" }, // Font size responsive
            }}
          >
            <BrandIcon fontSize="medium" sx={{ marginRight: "5px" }} />
            Thương hiệu
          </Typography>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleBrandClick("Dell")}>
                <ListItemText
                  primary="Dell"
                  sx={{ fontSize: { xs: "10px", md: "14px" } }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleBrandClick("HP")}>
                <ListItemText
                  primary="HP"
                  sx={{ fontSize: { xs: "10px", md: "14px" } }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Stack>
    </Box>
  );
};

export default SubNavbar;
