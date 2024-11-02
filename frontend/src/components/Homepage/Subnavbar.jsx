/* eslint-disable no-unused-vars */
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
import { useReadAllCategory } from "../../api/queries";

const SubNavbar = ({ categories }) => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
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

  return (
    <Stack
      spacing={2}
      sx={{
        width: "280px",
        mr: "12px",
        overflowY: "auto",
        boxShadow: "0 0 8px rgba(0,0,0,0.2)",
        borderRadius: "3px",
        overflowX: "hidden",
        display: { xs: "none", md: "flex" },
      }}
    >
      {/* Danh mục */}
      <List sx={{ py: 0 }}>
        {categories.map(({ categoryName, categoryCode }) => (
          <ListItem disablePadding key={categoryCode}>
            <ListItemButton
              onClick={() => handleCategoryClick(categoryName)}
              sx={{ p: "4px 8px" }}
            >
              <ListItemText
                primary={categoryName}
                primaryTypographyProps={{
                  sx: {
                    fontSize: { xs: "12px" },
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};

export default SubNavbar;
