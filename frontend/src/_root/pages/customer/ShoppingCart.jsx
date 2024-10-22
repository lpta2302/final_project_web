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
  useMediaQuery,
  Card,
  CardContent,
  CardMedia,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Router TP-Link Archer AX23 (1275 Mbps/ Wifi 6/ 2.4/5 GHz)",
      price: 949000,
      quantity: 1,
      image:
        "https://www.tnc.com.vn/uploads/product/XUYEN_102020/DELL-S2421HN.jpg",
    },
    // Add more items if needed...
  ]);

  const [discountCode, setDiscountCode] = useState("");
  const [shippingFee, setShippingFee] = useState(0);
  const [discountValue, setDiscountValue] = useState(0);

  const isMobile = useMediaQuery("(max-width:600px)"); // Kiểm tra nếu màn hình nhỏ hơn 600px

  useEffect(() => {
    const fetchShippingFee = async () => {
      try {
        const response = await fetch("/api/shipping-fee");
        const data = await response.json();
        setShippingFee(data.fee);
      } catch (error) {
        console.error("Lỗi khi lấy phí ship từ backend:", error);
      }
    };
    fetchShippingFee();
  }, []);

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
    <Container sx={{ marginTop: "50px", paddingX: isMobile ? "8px" : "24px" }}>
      <Typography
        variant="h4"
        gutterBottom
        align={isMobile ? "center" : "left"}
      >
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
          <Button component={Link} to="/" variant="contained" color="primary">
            Quay lại Trang chủ
          </Button>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {/* Phần giỏ hàng bên trái */}
          <Grid item xs={12} md={8}>
            {isMobile ? (
              cartItems.map((item) => (
                <Card
                  key={item.id}
                  sx={{ display: "flex", marginBottom: "16px" }}
                >
                  <CardMedia
                    component="img"
                    sx={{ width: 100 }}
                    image={item.image}
                    alt={item.name}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6">{item.name}</Typography>
                      <Typography variant="body2">
                        Giá: {item.price.toLocaleString()} đ
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: "8px",
                        }}
                      >
                        <IconButton
                          onClick={() =>
                            handleQuantityChange(item.id, "decrease")
                          }
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{item.quantity}</Typography>
                        <IconButton
                          onClick={() =>
                            handleQuantityChange(item.id, "increase")
                          }
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                      <Typography variant="body2" sx={{ marginTop: "8px" }}>
                        Tổng cộng:{" "}
                        {(item.price * item.quantity).toLocaleString()} đ
                      </Typography>
                    </CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        padding: "8px",
                      }}
                    >
                      <Button
                        onClick={() => handleDeleteItem(item.id)}
                        startIcon={<DeleteIcon />}
                        color="error"
                      >
                        Xóa
                      </Button>
                    </Box>
                  </Box>
                </Card>
              ))
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ẢNH</TableCell>
                      <TableCell>SẢN PHẨM</TableCell>
                      <TableCell>GIÁ</TableCell>
                      <TableCell>SỐ LƯỢNG</TableCell>
                      <TableCell>TỔNG CỘNG</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartItems.map((item) => (
                      <TableRow key={item.id}>
                        {/* Ảnh sản phẩm */}
                        <TableCell
                          sx={{
                            padding: "8px",
                            width: { xs: "50px", sm: "70px", md: "90px" }, // Giảm kích thước ảnh hơn
                          }}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{
                              width: "100%",
                              maxWidth: { xs: "50px", sm: "70px", md: "90px" }, // Giới hạn chiều rộng tối đa của ảnh
                              height: "auto",
                            }}
                          />
                        </TableCell>
                        {/* Cột sản phẩm với font chữ điều chỉnh */}
                        <TableCell
                          sx={{
                            wordWrap: "break-word",
                            minWidth: "200px",
                            maxWidth: { xs: "120px", sm: "180px", md: "250px" }, // Điều chỉnh độ rộng của cột tên sản phẩm
                            flexGrow: 1,
                            fontSize: { xs: "10px", sm: "12px", md: "14px" }, // Giảm kích thước font chữ
                          }}
                        >
                          {item.name}
                        </TableCell>
                        {/* Cột giá */}
                        <TableCell
                          sx={{
                            whiteSpace: "nowrap",
                            fontSize: { xs: "10px", sm: "12px", md: "14px" }, // Điều chỉnh font chữ
                          }}
                        >
                          {item.price.toLocaleString()} đ
                        </TableCell>
                        {/* Cột số lượng */}
                        <TableCell
                          sx={{
                            whiteSpace: "nowrap",
                            fontSize: { xs: "10px", sm: "12px", md: "14px" }, // Điều chỉnh font chữ
                          }}
                        >
                          <Button
                            onClick={() =>
                              handleQuantityChange(item.id, "decrease")
                            }
                            sx={{
                              fontSize: { xs: "10px", sm: "12px", md: "14px" },
                            }} // Font chữ của button
                          >
                            -
                          </Button>
                          {item.quantity}
                          <Button
                            onClick={() =>
                              handleQuantityChange(item.id, "increase")
                            }
                            sx={{
                              fontSize: { xs: "10px", sm: "12px", md: "14px" },
                            }} // Font chữ của button
                          >
                            +
                          </Button>
                        </TableCell>
                        {/* Cột tổng cộng */}
                        <TableCell
                          sx={{
                            whiteSpace: "nowrap",
                            fontSize: { xs: "10px", sm: "12px", md: "14px" }, // Điều chỉnh font chữ
                          }}
                        >
                          {(item.price * item.quantity).toLocaleString()} đ
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={() => handleDeleteItem(item.id)}
                            startIcon={<DeleteIcon />}
                            color="error"
                            sx={{
                              fontSize: { xs: "10px", sm: "12px", md: "14px" },
                            }} // Font chữ của nút xóa
                          >
                            Xóa
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
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
