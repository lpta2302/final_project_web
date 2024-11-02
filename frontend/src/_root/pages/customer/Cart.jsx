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
import { Link, useNavigate } from "react-router-dom";
import DiscountSection from "../../../components/Cart/usevoucher";
import { useReadAllCart } from "../../../api/queries";
const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Router TP-Link Archer AX23 (1275 Mbps/ Wifi 6/ 2.4/5 GHz)",
      price: 949000,
      quantity: 1,
      image:
        "https://www.tnc.com.vn/uploads/product/XUYEN_102020/DELL-S2421HN.jpg",
    },
    {
      id: 2,
      name: "Router TP-Link Archer AX23 (1275 Mbps/ Wifi 6/ 2.4/5 GHz)",
      price: 149000,
      quantity: 1,
      image:
        "https://www.tnc.com.vn/uploads/product/XUYEN_102020/DELL-S2421HN.jpg",
    },
    {
      id: 3,
      name: "Router TP-Link Archer AX23 (1275 Mbps/ Wifi 6/ 2.4/5 GHz)",
      price: 149000,
      quantity: 1,
      image:
        "https://www.tnc.com.vn/uploads/product/XUYEN_102020/DELL-S2421HN.jpg",
    },
  ]);

  const [shippingFee, setShippingFee] = useState(0);
  const [discountValue, setDiscountValue] = useState(0);

  const {} = useReadAllCart();
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleQuantityChange = (id, operation) => {
    setCartItems((prevItems) =>
      prevItems.reduce((acc, item) => {
        if (item.id === id) {
          const newQuantity =
            operation === "increase" ? item.quantity + 1 : item.quantity - 1;
          if (newQuantity > 0) {
            acc.push({ ...item, quantity: newQuantity });
          }
          // Nếu newQuantity = 0, không thêm sản phẩm này vào giỏ nữa
        } else {
          acc.push(item); // Sản phẩm khác giữ nguyên
        }
        return acc;
      }, [])
    );
  };

  const handleDeleteItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalWithDiscountAndShipping =
    totalAmount + shippingFee - discountValue;

  return (
    <Container sx={{ marginTop: "50px", paddingX: isMobile ? "8px" : "24px" }}>
      <Typography
        variant="h4"
        gutterBottom
        align={isMobile ? "center" : "left"}
        sx={{ fontSize: isMobile ? "1.5rem" : "2rem" }}
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
          <Typography
            variant="h6"
            sx={{ fontSize: "30px", textAlign: "center" }}
            gutterBottom
          >
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
              <Box sx={{ maxHeight: "400px", overflowY: "auto" }}>
                {cartItems.map((item) => (
                  <Card
                    key={item.id}
                    sx={{
                      display: "flex",
                      marginBottom: "16px",
                      flexDirection: isMobile ? "column" : "row",
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{ width: isMobile ? "100%" : 100 }} // Full width on mobile
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
                ))}
              </Box>
            ) : (
              <TableContainer sx={{ maxHeight: "400px", overflowY: "auto" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ẢNH</TableCell>
                      <TableCell>SẢN PHẨM</TableCell>
                      <TableCell>GIÁ</TableCell>
                      <TableCell width={"300"}>SỐ LƯỢNG</TableCell>
                      <TableCell width={"300"}>TỔNG CỘNG</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell
                          sx={{
                            padding: "8px",
                            width: { xs: "50px", sm: "70px", md: "90px" },
                          }}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{
                              width: "100%",
                              maxWidth: {
                                xs: "50px",
                                sm: "70px",
                                md: "90px",
                              },
                              height: "auto",
                            }}
                          />
                        </TableCell>
                        <TableCell
                          sx={{
                            wordWrap: "break-word",
                            minWidth: "200px",
                            maxWidth: { xs: "120px", sm: "180px", md: "250px" },
                            flexGrow: 1,
                            fontSize: { xs: "10px", sm: "12px", md: "14px" },
                          }}
                        >
                          {item.name}
                        </TableCell>
                        <TableCell
                          sx={{
                            whiteSpace: "nowrap",
                            fontSize: { xs: "10px", sm: "12px", md: "14px" },
                          }}
                        >
                          {item.price.toLocaleString()} đ
                        </TableCell>
                        <TableCell
                          sx={{
                            whiteSpace: "nowrap",
                            fontSize: { xs: "10px", sm: "12px", md: "14px" },
                          }}
                        >
                          <IconButton
                            onClick={() =>
                              handleQuantityChange(item.id, "decrease")
                            }
                          >
                            <RemoveIcon />
                          </IconButton>
                          {item.quantity}
                          <IconButton
                            onClick={() =>
                              handleQuantityChange(item.id, "increase")
                            }
                          >
                            <AddIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell
                          sx={{
                            whiteSpace: "nowrap",
                            fontSize: { xs: "10px", sm: "12px", md: "14px" },
                          }}
                        >
                          {(item.price * item.quantity).toLocaleString()} đ
                        </TableCell>
                        <TableCell
                          sx={{
                            whiteSpace: "nowrap",
                            fontSize: { xs: "10px", sm: "12px", md: "14px" },
                          }}
                        >
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
            )}
          </Grid>

          {/* Phần tổng thanh toán */}
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                padding: "16px",
                width: isMobile ? "100%" : "80%",
                margin: isMobile ? "auto" : "0",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Tổng cộng
              </Typography>
              <Typography variant="body1">
                Tổng tiền: {totalAmount.toLocaleString()} đ
              </Typography>
              <Typography variant="body1">
                Phí ship: {shippingFee.toLocaleString()} đ
              </Typography>
              <Typography variant="body1" gutterBottom>
                Giảm giá: {discountValue.toLocaleString()} đ
              </Typography>
              <Typography variant="h6" gutterBottom>
                Thành tiền: {totalWithDiscountAndShipping.toLocaleString()} đ
              </Typography>

              {/* Discount Section */}
              <DiscountSection
                totalAmount={totalAmount}
                setDiscountValue={setDiscountValue}
              />

              <Button
                variant="contained"
                color="secondary"
                fullWidth
                sx={{ marginTop: "16px" }}
                component={Link}
                to="/checkoutpage"
              >
                Thanh toán
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Cart;
