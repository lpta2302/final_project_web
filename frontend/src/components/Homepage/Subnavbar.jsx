import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Stack,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  CircularProgress,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import { useReadAllCategory } from "../../api/queries";

const SubNavbar = () => {
  const navigate = useNavigate();
  const { data: categories, isLoading, isError, error } = useReadAllCategory();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/productgrid?category=${category}`);
  };

  if (isLoading) return <CircularProgress />;
  if (isError)
    return (
      <Typography color="error">
        Lỗi khi tải danh mục: {error?.message || "Lỗi không xác định"}
      </Typography>
    );

  if (!categories || categories.length === 0) {
    return <Typography>Không có danh mục nào để hiển thị</Typography>;
  }

  return isMobile ? (
    <BottomNavigation
      showLabels
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.2)",
        zIndex: 1000,
      }}
    >
      {categories.map(({ categoryName, categoryCode }) => (
        <BottomNavigationAction
          key={categoryCode}
          label={categoryName}
          icon={<CategoryIcon />}
          onClick={() => handleCategoryClick(categoryCode)}
        />
      ))}
    </BottomNavigation>
  ) : (
    <Stack
      spacing={2}
      sx={{
        width: "280px",
        mr: "12px",
        overflowY: "auto",
        boxShadow: "0 0 8px rgba(0,0,0,0.2)",
        borderRadius: "3px",
        overflowX: "hidden",
      }}
    >
      <List sx={{ py: 0 }}>
        {categories.map(({ categoryName, categoryCode }) => (
          <ListItem disablePadding key={categoryCode}>
            <ListItemButton
              onClick={() => handleCategoryClick(categoryCode)}
              sx={{ p: "4px 8px" }}
            >
              <ListItemText primary={categoryName} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};

export default SubNavbar;
