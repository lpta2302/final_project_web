import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";

// Giả định dữ liệu từ trang shopping cart
const CheckoutPage = () => {
  const location = useLocation();
  const { cartItems, savedCustomerInfo } = location.state || {
    cartItems: [],
    savedCustomerInfo: null,
  };

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });

  const [useSavedInfo, setUseSavedInfo] = useState(false);

  useEffect(() => {
    if (useSavedInfo && savedCustomerInfo) {
      setCustomerInfo(savedCustomerInfo);
    } else {
      setCustomerInfo({
        name: "",
        address: "",
        phone: "",
        email: "",
      });
    }
  }, [useSavedInfo, savedCustomerInfo]);

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Container style={{ marginTop: "20px" }}>
      <Grid container spacing={3}>
        {/* Left Side - Product Info and Customer Form */}
        <Grid item xs={12} md={8}>
          {/* Product Info */}
          <Paper style={{ padding: "16px", marginBottom: "20px" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <img
                  src="/path-to-image" // You can replace this with your product image
                  alt="Product"
                  style={{ width: "100%", borderRadius: "8px" }}
                />
              </Grid>
              <Grid item xs={12} md={9}>
                <Typography variant="h6">
                  Acer Aspire 3 A315-44P-R5QG R7 5700U/Bạc
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Màu: Bạc
                </Typography>
                <Box mt={1}>
                  <Typography variant="body1">
                    <span
                      style={{ textDecoration: "line-through", color: "#888" }}
                    >
                      14.990.000 đ
                    </span>{" "}
                    <span style={{ fontWeight: "bold", color: "#f00" }}>
                      11.990.000 đ
                    </span>
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* Customer Form */}
          <Paper style={{ padding: "16px" }}>
            <Typography variant="h6" gutterBottom>
              Thông tin khách hàng
            </Typography>

            {savedCustomerInfo && (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={useSavedInfo}
                    onChange={() => setUseSavedInfo(!useSavedInfo)}
                    color="primary"
                  />
                }
                label="Sử dụng thông tin đã lưu"
              />
            )}

            <form noValidate autoComplete="off">
              <TextField
                label="Họ và tên"
                name="name"
                value={customerInfo.name}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                variant="outlined"
                disabled={useSavedInfo}
              />
              <TextField
                label="Địa chỉ"
                name="address"
                value={customerInfo.address}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                variant="outlined"
                disabled={useSavedInfo}
              />
              <TextField
                label="Số điện thoại"
                name="phone"
                value={customerInfo.phone}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                variant="outlined"
                disabled={useSavedInfo}
              />
              <TextField
                label="Email"
                name="email"
                value={customerInfo.email}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                variant="outlined"
                disabled={useSavedInfo}
              />
            </form>
          </Paper>
        </Grid>

        {/* Right Side - Order Summary */}
        <Grid item xs={12} md={4}>
          <Paper style={{ padding: "16px" }}>
            <Typography variant="h6" gutterBottom>
              Thông tin đơn hàng
            </Typography>
            <Divider style={{ margin: "8px 0" }} />

            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography>Tổng tiền</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="right">14.990.000 đ</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography>Tổng khuyến mãi</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="right">3.500.000 đ</Typography>
              </Grid>
              <Grid item xs={6} style={{ paddingLeft: "16px" }}>
                <Typography>- Giảm giá sản phẩm</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="right">3.000.000 đ</Typography>
              </Grid>
              <Grid item xs={6} style={{ paddingLeft: "16px" }}>
                <Typography>- Voucher</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="right">500.000 đ</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography>Phí vận chuyển</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography align="right">Miễn phí</Typography>
              </Grid>

              <Divider style={{ margin: "8px 0", width: "100%" }} />

              <Grid item xs={6}>
                <Typography variant="h6">Cần thanh toán</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" align="right" color="error">
                  11.490.000 đ
                </Typography>
              </Grid>
            </Grid>
            {/* Nút đặt hàng */}
            <Button
              variant="contained"
              fullWidth
              style={{
                marginTop: "20px",
                padding: "10px",
                backgroundColor: "#0672cb",
              }}
            >
              Đặt hàng
            </Button>

            <Typography
              variant="body2"
              color="textSecondary"
              align="center"
              style={{ marginTop: "10px" }}
            >
              Bằng việc tiến hành đặt mua hàng, bạn đồng ý với{" "}
              <a href="#">Điều khoản dịch vụ</a> và{" "}
              <a href="#">Chính sách xử lý dữ liệu cá nhân</a> của FPT Shop
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckoutPage;
