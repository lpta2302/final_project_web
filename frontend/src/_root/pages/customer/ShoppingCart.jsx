import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Box,
  Paper,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Router TP-Link Archer AX23 (1275 Mbps/ Wifi 6/ 2.4/5 GHz)",
      price: 949000,
      quantity: 1,
    },
    {
      id: 2,
      name: "Router TP-Link Archer AX23 (1275 Mbps/ Wifi 6/ 2.4/5 GHz)",
      price: 949000,
      quantity: 1,
    },
    {
      id: 3,
      name: "Router TP-Link Archer AX23 (1275 Mbps/ Wifi 6/ 2.4/5 GHz)",
      price: 949000,
      quantity: 1,
    },
    {
      id: 4,
      name: "Router TP-Link Archer AX23 (1275 Mbps/ Wifi 6/ 2.4/5 GHz)",
      price: 949000,
      quantity: 1,
    },
    {
      id: 5,
      name: "Router TP-Link Archer AX23 (1275 Mbps/ Wifi 6/ 2.4/5 GHz)",
      price: 949000,
      quantity: 1,
    },
    {
      id: 6,
      name: "Router TP-Link Archer AX23 (1275 Mbps/ Wifi 6/ 2.4/5 GHz)",
      price: 949000,
      quantity: 1,
    },
    {
      id: 7,
      name: "Router TP-Link Archer AX23 (1275 Mbps/ Wifi 6/ 2.4/5 GHz)",
      price: 949000,
      quantity: 1,
    },
    {
      id: 8,
      name: "Router TP-Link Archer AX23 (1275 Mbps/ Wifi 6/ 2.4/5 GHz)",
      price: 949000,
      quantity: 1,
    },
    {
      id: 9,
      name: "Router TP-Link Archer AX23 (1275 Mbps/ Wifi 6/ 2.4/5 GHz)",
      price: 949000,
      quantity: 1,
    }, // Add more items if needed
  ]);

  const [discountCode, setDiscountCode] = useState("");
  const [shippingFee, setShippingFee] = useState(0); // Set initial shipping fee as 0
  const [discountValue, setDiscountValue] = useState(0);

  useEffect(() => {
    // Giả sử đây là API lấy phí ship từ BE
    const fetchShippingFee = async () => {
      try {
        // Thay thế URL bên dưới bằng API thực tế
        const response = await fetch("/api/shipping-fee");
        const data = await response.json();
        setShippingFee(data.fee); // Cập nhật phí ship từ dữ liệu API
      } catch (error) {
        console.error("Lỗi khi lấy phí ship từ backend:", error);
      }
    };

    fetchShippingFee();
  }, []); // Gọi API khi component được load

  const handleQuantityChange = (id, operation) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                operation === "increase"
                  ? item.quantity + 1
                  : Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  const handleDeleteItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleApplyDiscount = () => {
    if (discountCode === "SALE10") {
      setDiscountValue(totalAmount * 0.1);
    } else {
      setDiscountValue(0);
    }
  };

  const totalWithDiscountAndShipping =
    totalAmount + shippingFee - discountValue;

  return (
    <Container sx={{ marginTop: "50px" }}>
      <Typography variant="h4" gutterBottom>
        Giỏ hàng
      </Typography>

      {cartItems.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
            flexDirection: "column",
          }}
        >
          <SentimentDissatisfiedIcon
            sx={{ fontSize: 80, color: "#757575", marginBottom: "16px" }}
          />
          <Typography variant="h6" sx={{ fontSize: "30px" }} gutterBottom>
            Giỏ hàng của bạn hiện đang trống!
          </Typography>
          <Button
            component={Link}
            to="/homepageclient"
            variant="contained"
            color="primary"
          >
            Quay lại Trang chủ
          </Button>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {/* Phần giỏ hàng bên trái */}
          <Grid item xs={12} md={8}>
            <TableContainer sx={{ maxHeight: "600px", overflowX: "auto" }}>
              {" "}
              {/* Tăng chiều cao */}
              <Table stickyHeader sx={{ minWidth: "900px" }}>
                {" "}
                {/* Tăng chiều rộng của bảng */}
                <TableHead>
                  <TableRow>
                    <TableCell>ẢNH</TableCell>
                    <TableCell>SẢN PHẨM</TableCell>
                    <TableCell>GIÁ</TableCell>
                    <TableCell sx={{ marginLeft: "0px" }}>SỐ LƯỢNG</TableCell>
                    <TableCell>TỔNG CỘNG</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <img
                          src="https://www.tnc.com.vn/uploads/product/XUYEN_102020/DELL-S2421HN.jpg"
                          width="100"
                          alt={item.name}
                        />
                      </TableCell>
                      <TableCell
                        sx={{
                          wordWrap: "break-word", // Cho phép nội dung xuống dòng khi quá dài
                          maxWidth: "250px", // Giới hạn chiều rộng của cột
                        }}
                      >
                        {item.name}
                      </TableCell>
                      <TableCell sx={{ minWidth: "120px" }}>
                        {item.price.toLocaleString()} đ
                      </TableCell>{" "}
                      {/* Tăng chiều rộng cột giá */}
                      <TableCell sx={{ minWidth: "180px" }}>
                        <Button
                          onClick={() =>
                            handleQuantityChange(item.id, "decrease")
                          }
                        >
                          -
                        </Button>
                        {item.quantity}
                        <Button
                          onClick={() =>
                            handleQuantityChange(item.id, "increase")
                          }
                        >
                          +
                        </Button>
                      </TableCell>
                      <TableCell sx={{ minWidth: "150px" }}>
                        {(item.price * item.quantity).toLocaleString()} đ
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleDeleteItem(item.id)}
                          startIcon={<DeleteIcon />}
                          color="error"
                        >
                          Xóa
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* Phần mã giảm giá và tổng tiền bên phải */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ padding: "10px", borderRadius: "10px" }}>
              <Typography variant="h6" gutterBottom>
                Áp dụng mã giảm giá
              </Typography>
              <TextField
                label="Nhập mã giảm giá"
                variant="outlined"
                fullWidth
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                sx={{ marginBottom: "20px" }}
              />
              <Button
                variant="contained"
                fullWidth
                onClick={handleApplyDiscount}
                sx={{ marginBottom: "20px" }}
              >
                Áp dụng
              </Button>

              <Typography variant="h6" gutterBottom>
                Phí ship
              </Typography>
              <Typography sx={{ marginBottom: "20px" }}>
                {shippingFee.toLocaleString()} đ
              </Typography>

              <Typography variant="h6" gutterBottom>
                Tổng cộng
              </Typography>
              <Typography variant="h6" sx={{ marginBottom: "20px" }}>
                {totalWithDiscountAndShipping.toLocaleString()} đ
              </Typography>

              <Button
                variant="contained"
                fullWidth
                sx={{ backgroundColor: "#1976d2", color: "white" }}
              >
                Tiếp tục thanh toán
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default CartPage;
