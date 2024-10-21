import {
  Button,
  Typography,
  Toolbar,
  ListItemText,
  ListItemButton,
  ListItem,
  List,
  IconButton,
  Drawer,
  Divider,
  AppBar,
  Box,
  buttonClasses,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { appBar } from "../constance/constance";
const drawerWidth = 240;
const navItems = appBar["customer"];

function TopAppBar() {
  const navigate = useNavigate(); // Khởi tạo navigate

  const handleButtonClick = (link) => {
    navigate(`${link}`); // Điều hướng đến trang giỏ hàng
  };
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            MUI
          </Typography>
          <Box
            sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}
          >
            {navItems.map((item) => (
              <Button
                size="large"
                startIcon={<item.icon />}
                key={item.title}
                sx={{
                  color: "#fff",
                  [`& .${buttonClasses.startIcon} > *:nth-of-type(1)`]: {
                    fontSize: "32px",
                  },
                  alignItems: "center",
                }}
                onClick={() => handleButtonClick(item.link)}
              // Gán onClick handler
              >
                {item.title}
              </Button>
            ))}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button sx={{ color: "#fff" }}>Đăng nhập</Button>
              <Divider
                sx={{ bgcolor: "#fff", height: "20px", width: "1px" }}
                orientation="vertical"
                variant="middle"
                flexItem
              ></Divider>
              <Button sx={{ color: "#fff" }}>Đăng ký</Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

export default TopAppBar;

