import React, { useState } from "react";
import {
  Box,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
} from "@mui/material";

import { Rating } from "@mui/material";
import { Menu } from "@mui/material";
// FilterBar Component
const FilterBar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly   ",
        mb: 1,
        ml: 40,
        mt: 5,
      }}
    >
      <Select defaultValue="Mới nhất" label="Sắp xếp" size="small">
        <MenuItem value="Mới nhất">Mới nhất</MenuItem>
        <MenuItem value="Giá tăng dần">Giá tăng dần</MenuItem>
        <MenuItem value="Giá giảm dần">Giá giảm dần</MenuItem>
      </Select>
      <Select defaultValue="40" label="Hiển thị" size="small">
        <MenuItem value="20">20</MenuItem>
        <MenuItem value="40">40</MenuItem>
        <MenuItem value="60">60</MenuItem>
      </Select>
      <Select defaultValue="Tất cả" label="Khoảng giá" size="small">
        <MenuItem value="Tất cả">Tất cả</MenuItem>
        <MenuItem value="Dưới 5 triệu">Dưới 5 triệu</MenuItem>
        <MenuItem value="5 - 10 triệu">5 - 10 triệu</MenuItem>
      </Select>
      <Select defaultValue="Tất cả" label="Trạng thái" size="small">
        <MenuItem value="Tất cả">Tất cả</MenuItem>
        <MenuItem value="Còn hàng">Còn hàng</MenuItem>
        <MenuItem value="Hết hàng">Hết hàng</MenuItem>
      </Select>
    </Box>
  );
};

// MenuProduct Component
const MenuProduct = () => {
  const [anchorElLaptop, setAnchorElLaptop] = useState(null);
  const [anchorElPC, setAnchorElPC] = useState(null);

  const handleMouseEnterLaptop = (event) => {
    setAnchorElLaptop(event.currentTarget);
  };

  const handleMouseLeaveLaptop = () => {
    setAnchorElLaptop(null);
  };

  const handleMouseEnterPC = (event) => {
    setAnchorElPC(event.currentTarget);
  };

  const handleMouseLeavePC = () => {
    setAnchorElPC(null);
  };

  return (
    <Box
      sx={{
        width: "250px",
        bgcolor: "#ffffff",
        border: "2px solid #25A18E",
        float: "left",
        paddingLeft: "5px",
        marginLeft: "24px",
      }}
    >
      <Typography sx={{ color: "#25A18E" }}>SẢN PHẨM</Typography>
      <List>
        <ListItem
          onMouseEnter={handleMouseEnterLaptop}
          onMouseLeave={handleMouseLeaveLaptop}
        >
          <ListItemButton>
            <ListItemText primary="Laptop" />
          </ListItemButton>
          <Menu
            anchorEl={anchorElLaptop}
            open={Boolean(anchorElLaptop)}
            onClose={handleMouseLeaveLaptop}
            MenuListProps={{
              onMouseEnter: handleMouseEnterLaptop,
              onMouseLeave: handleMouseLeaveLaptop,
            }}
            PaperProps={{
              style: {
                width: "600px",
                padding: "10px",
              },
            }}
          >
            <Typography sx={{ color: "#25A18E", marginBottom: "10px" }}>
              DANH MỤC CON
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)", // 2-column layout
                gap: "10px",
                paddingBottom: "10px",
                borderBottom: "2px solid #25A18E",
              }}
            >
              <MenuItem>Laptop Dell</MenuItem>
              <MenuItem>Laptop HP</MenuItem>
              <MenuItem>Laptop ASUS</MenuItem>
              <MenuItem>Laptop Lenovo</MenuItem>
              <MenuItem>Laptop LG</MenuItem>
              <MenuItem>Laptop Apple - Macbook</MenuItem>
              <MenuItem>Laptop MSI</MenuItem>
              <MenuItem>Laptop Gigabyte</MenuItem>
              <MenuItem>Laptop Acer</MenuItem>
              <MenuItem>Laptop theo ngành nghề</MenuItem>
            </Box>

            <Typography sx={{ color: "#25A18E", marginTop: "10px" }}>
              MỨC GIÁ
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "10px",
              }}
            >
              <MenuItem>Dưới 5 triệu</MenuItem>
              <MenuItem>5 triệu đến 9 triệu</MenuItem>
              <MenuItem>9 triệu đến 12 triệu</MenuItem>
              <MenuItem>12 triệu đến 14 triệu</MenuItem>
              <MenuItem>Trên 14 triệu</MenuItem>
              <MenuItem>Trên 20 triệu</MenuItem>
            </Box>
          </Menu>
        </ListItem>
        <ListItem
          onMouseEnter={handleMouseEnterPC}
          onMouseLeave={handleMouseLeavePC}
        >
          <ListItemButton>
            <ListItemText primary="Máy tính - PC" />
          </ListItemButton>
          <Menu
            anchorEl={anchorElPC}
            open={Boolean(anchorElPC)}
            onClose={handleMouseLeavePC}
            MenuListProps={{
              onMouseEnter: handleMouseEnterPC,
              onMouseLeave: handleMouseLeavePC,
            }}
            PaperProps={{
              style: {
                width: "600px",
                padding: "10px",
              },
            }}
          >
            <Typography sx={{ color: "#25A18E", marginBottom: "10px" }}>
              DANH MỤC CON
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)", // 2-column layout
                gap: "10px",
                paddingBottom: "10px",
                borderBottom: "2px solid #25A18E",
              }}
            >
              <MenuItem>Máy bộ</MenuItem>
              <MenuItem>Máy bộ HP</MenuItem>
              <MenuItem>Máy bộ Lenovo</MenuItem>
              <MenuItem>Máy bộ Apple - iMac</MenuItem>
              <MenuItem>Máy bộ Mini (NUC, MiniPC)</MenuItem>
              <MenuItem>Máy bộ MSI</MenuItem>
              <MenuItem>Máy bộ Dell</MenuItem>
              <MenuItem>Máy bộ ASUS</MenuItem>
              <MenuItem>Máy bộ Acer</MenuItem>
              <MenuItem>Máy bộ Apple - Mac Mini</MenuItem>
              <MenuItem>Máy bộ All-In-One(AIO)</MenuItem>
            </Box>

            <Typography sx={{ color: "#25A18E", marginTop: "10px" }}>
              MỨC GIÁ
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "10px",
              }}
            >
              <MenuItem>Dưới 5 triệu</MenuItem>
              <MenuItem>5 triệu đến 9 triệu</MenuItem>
              <MenuItem>9 triệu đến 12 triệu</MenuItem>
              <MenuItem>12 triệu đến 14 triệu</MenuItem>
              <MenuItem>Trên 14 triệu</MenuItem>
              <MenuItem>Trên 20 triệu</MenuItem>
            </Box>
          </Menu>
        </ListItem>

        {[
          "Linh kiện Laptop",
          "Màn hình máy tính",
          "Linh kiện máy tính",
          "Phụ kiện máy tính",
          "HDD/SSD External",
          "Thiết bị văn phòng",
        ].map((text, index) => (
          <ListItem key={index}>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

// ProductCard Component
const ProductCard = ({ product, onClick }) => {
  if (!product) return null;

  return (
    <Card sx={{ float: "left", width: "300px", border: "2px solid green" }}>
      <CardActionArea onClick={onClick}>
        <CardMedia
          component="img"
          height="150"
          image={product.imageUrl || "https://via.placeholder.com/300"}
          alt={product.title || "Product Image"}
          style={{ marginRight: "100px" }}
        />
        <CardContent>
          <Box sx={{ textAlign: "center" }}>
            <Typography gutterBottom variant="h6" component="div">
              {product.title || "Unknown Title"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.description || "No description available."}
            </Typography>
            <Typography
              variant="h6"
              color="text.primary"
              sx={{ marginTop: "8px" }}
            >
              {product.price || "N/A"}
            </Typography>
            <Typography
              variant="h6"
              color="text.primary"
              sx={{ marginTop: "8px", fontSize: "16px" }}
            >
              Tình trạng: {product.status || "N/A"}
            </Typography>
            <Typography
              variant="h6"
              color="text.primary"
              sx={{ marginTop: "8px", fontSize: "16px" }}
            >
              {product.specs || "N/A"}
            </Typography>

            {/* Thêm phần Rating */}
            <Rating
              name="read-only"
              value={product.rating || 0} // Thêm giá trị rating nếu có
              precision={0.5}
              readOnly
              sx={{ marginTop: "8px" }}
            />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

// ProductList Component
const products = [
  {
    id: 1,
    title: "Laptop A",
    description:
      "Laptop A với cấu hình mạnh mẽ, phù hợp cho công việc văn phòng.",
    price: "15,000,000 VND",
    imageUrl: "https://via.placeholder.com/300",
    status: "Còn hàng",
    rating: 4.5,
    specs: [
      "OS: Windows 11 Home",
      "CPU: Intel Core i5-13500H",
      "RAM: 16GB DDR5",
      "Ổ cứng: 512GB PCIe Gen4 NVMe",
      "VGA: Nvidia GeForce RTX 3050",
      "Màn hình: 16.1 FHD",
    ],
  },
  {
    id: 2,
    title: "Laptop B",
    description: "Laptop B thiết kế gọn nhẹ, thời lượng pin dài.",
    price: "18,000,000 VND",
    imageUrl: "https://via.placeholder.com/300",
    status: "Còn hàng",
    rating: 4.0,
    specs: [
      "OS: Windows 11 Home",
      "CPU: Intel Core i5-13500H",
      "RAM: 16GB DDR5",
      "Ổ cứng: 512GB PCIe Gen4 NVMe",
      "VGA: Nvidia GeForce RTX 3050",
      "Màn hình: 16.1 FHD",
    ],
  },
  {
    id: 3,
    title: "Laptop C",
    description: "Laptop C trang bị card đồ họa mạnh mẽ, phù hợp cho gaming.",
    price: "20,000,000 VND",
    imageUrl: "https://via.placeholder.com/300",
    status: "Còn hàng",
    rating: 4.5,
    specs: [
      "OS: Windows 11 Home",
      "CPU: Intel Core i5-13500H",
      "RAM: 16GB DDR5",
      "Ổ cứng: 512GB PCIe Gen4 NVMe",
      "VGA: Nvidia GeForce RTX 3050",
      "Màn hình: 16.1 FHD",
    ],
  },
  {
    id: 4,
    title: "Laptop D",
    description: "Laptop D trang bị cac đồ họa mạnh mẽ, phù hợp cho gaming.",
    price: "21,000,000 VND",
    imageUrl: "https://via.placeholder.com/300",
    status: "Còn hàng",
    rating: 5.0,
    specs: [
      "OS: Windows 11 Home",
      "CPU: Intel Core i5-13500H",
      "RAM: 16GB DDR5",
      "Ổ cứng: 512GB PCIe Gen4 NVMe",
      "VGA: Nvidia GeForce RTX 3050",
      "Màn hình: 16.1 FHD",
    ],
  },
  {
    id: 5,
    title: "Laptop D",
    description: "Laptop D trang bị cac đồ họa mạnh mẽ, phù hợp cho gaming.",
    price: "21,000,000 VND",
    imageUrl: "https://via.placeholder.com/300",
    status: "Còn hàng",
    rating: 4.5,
    specs: [
      "OS: Windows 11 Home",
      "CPU: Intel Core i5-13500H",
      "RAM: 16GB DDR5",
      "Ổ cứng: 512GB PCIe Gen4 NVMe",
      "VGA: Nvidia GeForce RTX 3050",
      "Màn hình: 16.1 FHD",
    ],
  },
  {
    id: 6,
    title: "Laptop D",
    description: "Laptop D trang bị cac đồ họa mạnh mẽ, phù hợp cho gaming.",
    price: "21,000,000 VND",
    imageUrl: "https://via.placeholder.com/300",
    status: "Còn hàng",
    rating: 4.5,
    specs: [
      "OS: Windows 11 Home",
      "CPU: Intel Core i5-13500H",
      "RAM: 16GB DDR5",
      "Ổ cứng: 512GB PCIe Gen4 NVMe",
      "VGA: Nvidia GeForce RTX 3050",
      "Màn hình: 16.1 FHD",
    ],
  },
  {
    id: 7,
    title: "Laptop D",
    description: "Laptop D trang bị cac đồ họa mạnh mẽ, phù hợp cho gaming.",
    price: "21,000,000 VND",
    imageUrl: "https://via.placeholder.com/300",
    status: "Còn hàng",
    rating: 4.5,
    specs: [
      "OS: Windows 11 Home",
      "CPU: Intel Core i5-13500H",
      "RAM: 16GB DDR5",
      "Ổ cứng: 512GB PCIe Gen4 NVMe",
      "VGA: Nvidia GeForce RTX 3050",
      "Màn hình: 16.1 FHD",
    ],
  },
  {
    id: 8,
    title: "Laptop D",
    description: "Laptop D trang bị cac đồ họa mạnh mẽ, phù hợp cho gaming.",
    price: "21,000,000 VND",
    imageUrl: "https://via.placeholder.com/300",
    status: "Còn hàng",
    rating: 4.5,
    specs: [
      "OS: Windows 11 Home",
      "CPU: Intel Core i5-13500H",
      "RAM: 16GB DDR5",
      "Ổ cứng: 512GB PCIe Gen4 NVMe",
      "VGA: Nvidia GeForce RTX 3050",
      "Màn hình: 16.1 FHD",
    ],
  },
  {
    id: 9,
    title: "Laptop D",
    description: "Laptop D trang bị cac đồ họa mạnh mẽ, phù hợp cho gaming.",
    price: "21,000,000 VND",
    imageUrl: "https://via.placeholder.com/300",
    status: "Còn hàng",
    rating: 4.5,
    specs: [
      "OS: Windows 11 Home",
      "CPU: Intel Core i5-13500H",
      "RAM: 16GB DDR5",
      "Ổ cứng: 512GB PCIe Gen4 NVMe",
      "VGA: Nvidia GeForce RTX 3050",
      "Màn hình: 16.1 FHD",
    ],
  },
  {
    id: 10,
    title: "Laptop D",
    description: "Laptop D trang bị cac đồ họa mạnh mẽ, phù hợp cho gaming.",
    price: "21,000,000 VND",
    imageUrl: "https://via.placeholder.com/300",
    status: "Hết hàng",
    rating: 4.5,
    specs: [
      "OS: Windows 11 Home",
      "CPU: Intel Core i5-13500H",
      "RAM: 16GB DDR5",
      "Ổ cứng: 512GB PCIe Gen4 NVMe",
      "VGA: Nvidia GeForce RTX 3050",
      "Màn hình: 16.1 FHD",
    ],
  },
];

// Thêm các sản phẩm khác tương tự

const ProductList = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        justifyContent: "center",
        marginTop: "24px",
      }}
    >
      {products.map((product) => (
        <Box key={product.id} sx={{ width: "300px" }}>
          <ProductCard product={product} />
        </Box>
      ))}
    </Box>
  );
};
const MenuProductPage = () => {
  return (
    <Box>
      <FilterBar />
      <MenuProduct />
      <ProductList />
    </Box>
  );
};
export default MenuProductPage;
