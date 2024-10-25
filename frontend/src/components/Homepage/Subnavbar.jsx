import React, { useState, useEffect } from "react";
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
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import {
  Category as CategoryIcon,
  BrandingWatermark as BrandIcon,
  Home as HomeIcon,
  LocalOffer as OfferIcon,
  AccountCircle as AccountIcon,
} from "@mui/icons-material";

const SubNavbar = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  // Kiểm tra xem có phải mobile không
  const checkIsMobile = () => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    // Kiểm tra xem có phải mobile không khi mount component
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile); // Lắng nghe thay đổi kích thước màn hình

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category}`);
  };

  const handleBrandClick = (brand) => {
    navigate(`/products?brand=${brand}`);
  };

  return (
    <>
      {isMobile ? (
        // Thanh navigation ngang cho mobile
        <BottomNavigation
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            backgroundColor: "#fff",
            boxShadow: "0 -2px 5px rgba(0,0,0,0.1)",
          }}
          showLabels
        >
          <BottomNavigationAction
            label="Trang chủ"
            icon={<HomeIcon />}
            onClick={() => navigate("/")}
          />
          <BottomNavigationAction
            label="Danh mục"
            icon={<CategoryIcon />}
            onClick={() => handleCategoryClick("Laptop")}
          />
          <BottomNavigationAction
            label="Khuyến mãi"
            icon={<OfferIcon />}
            onClick={() => navigate("/offers")}
          />
          <BottomNavigationAction
            label="Tài khoản"
            icon={<AccountIcon />}
            onClick={() => navigate("/profile")}
          />
        </BottomNavigation>
      ) : (
        // Thanh dọc cho màn hình lớn
        <Box
          sx={{
            width: { xs: "70px", sm: "150px", md: "200px", lg: "200px" },
            backgroundColor: "#fff",
            borderRight: "1px solid #ddd",
            paddingTop: { xs: "5px", sm: "10px" },
            position: "fixed",
            top: { xs: "50px", sm: "60px", lg: "70px" },
            left: 0,
            height: { xs: "calc(100vh - 50px)", sm: "calc(100vh - 60px)" },
            boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
            zIndex: 1000,
            overflowY: "auto",
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
                  fontSize: { xs: "10px", sm: "14px", md: "16px" },
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
                      sx={{ fontSize: { xs: "8px", sm: "12px", md: "14px" } }}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => handleCategoryClick("Chuột")}>
                    <ListItemText
                      primary="Chuột"
                      sx={{ fontSize: { xs: "8px", sm: "12px", md: "14px" } }}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => handleCategoryClick("Tai nghe")}
                  >
                    <ListItemText
                      primary="Tai nghe"
                      sx={{ fontSize: { xs: "8px", sm: "12px", md: "14px" } }}
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
                  fontSize: { xs: "10px", sm: "14px", md: "16px" },
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
                      sx={{ fontSize: { xs: "8px", sm: "12px", md: "14px" } }}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => handleBrandClick("HP")}>
                    <ListItemText
                      primary="HP"
                      sx={{ fontSize: { xs: "8px", sm: "12px", md: "14px" } }}
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default SubNavbar;
