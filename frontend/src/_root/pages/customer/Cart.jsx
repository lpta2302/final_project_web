import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Button,
  Box,
  Paper,
  useMediaQuery,
} from "@mui/material";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import { Link } from "react-router-dom";
import DiscountSection from "../../../components/Cart/usevoucher";
import {
  useAddCartItem,
  useReadOwnCart,
  useUpdateCart,
} from "../../../api/queries";
import CartItem from "../../../components/Cart/CartItem";

const Cart = () => {
  // Sử dụng hook để đọc dữ liệu giỏ hàng
  const { data: fetchedCartItems, error, isLoading } = useReadOwnCart();
  const createCartItem = useAddCartItem();
  const updateCart = useUpdateCart();

  const [cartItems, setCartItems] = useState([]);
  const [shippingFee, setShippingFee] = useState(0);
  const [discountValue, setDiscountValue] = useState(0);

  useEffect(() => {
    if (fetchedCartItems && Array.isArray(fetchedCartItems)) {
      setCartItems(fetchedCartItems);
    }
  }, [fetchedCartItems]);

  const isMobile = useMediaQuery("(max-width:600px)");

  const handleQuantityChange = (id, operation) => {
    setCartItems((prevItems) =>
      prevItems.reduce((acc, item) => {
        if (item.id === id) {
          const newQuantity =
            operation === "increase" ? item.quantity + 1 : item.quantity - 1;
          if (newQuantity > 0) {
            acc.push({ ...item, quantity: newQuantity });

            // Cập nhật số lượng sản phẩm trong cơ sở dữ liệu
            updateCart.mutate({ ...item, quantity: newQuantity });
          }
        } else {
          acc.push(item);
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

  // Hiển thị thông báo đang tải hoặc lỗi nếu có
  if (isLoading) {
    return (
      <Container sx={{ marginTop: "50px" }}>
        <Typography variant="h6" align="center">
          Đang tải dữ liệu giỏ hàng...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ marginTop: "50px" }}>
        <Typography variant="h6" align="center" color="error">
          Lỗi khi tải dữ liệu giỏ hàng. Vui lòng thử lại sau.
        </Typography>
      </Container>
    );
  }

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
          <Grid item xs={12} md={8}>
            <Box sx={{ maxHeight: "400px", overflowY: "auto" }}>
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  isMobile={isMobile}
                  handleQuantityChange={handleQuantityChange}
                  handleDeleteItem={handleDeleteItem}
                />
              ))}
            </Box>
          </Grid>

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
