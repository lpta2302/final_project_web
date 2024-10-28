import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
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
} from "@mui/material";

// Giả định dữ liệu từ trang shopping cart
const CheckoutPage = () => {
  const location = useLocation(); // Lấy dữ liệu từ state khi điều hướng
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
    // Nếu người dùng chọn sử dụng thông tin đã lưu
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

  // Tính tổng số tiền từ giỏ hàng
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Hàm xử lý khi thay đổi thông tin khách hàng
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Container style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Thanh toán
      </Typography>

      <Grid container spacing={3}>
        {/* Thông tin giỏ hàng */}
        <Grid item xs={12} md={8}>
          <Paper style={{ padding: "16px" }}>
            <Typography variant="h6" gutterBottom>
              Hóa đơn của bạn
            </Typography>

            {/* Bảng tóm tắt đơn hàng với scroll */}
            <TableContainer style={{ maxHeight: "300px", overflowY: "auto" }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Số thứ tự</TableCell>
                    <TableCell>Tên sản phẩm</TableCell>
                    <TableCell>Đơn giá</TableCell>
                    <TableCell>Số lượng</TableCell>
                    <TableCell>Tổng tiền</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.price.toLocaleString()} đ</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        {(item.price * item.quantity).toLocaleString()} đ
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Divider style={{ margin: "16px 0" }} />
            <Typography variant="h6">
              Tổng cộng: {totalAmount.toLocaleString()} đ
            </Typography>
          </Paper>
        </Grid>

        {/* Form thông tin khách hàng */}
        <Grid item xs={12} md={4}>
          <Paper style={{ padding: "16px" }}>
            <Typography variant="h6" gutterBottom>
              Thông tin khách hàng
            </Typography>

            {/* Checkbox chọn sử dụng thông tin đã lưu */}
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
      </Grid>

      {/* Nút xác nhận thanh toán */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginTop: "20px", padding: "10px" }}
        onClick={() => {
          // Thực hiện hành động thanh toán
          console.log("Customer Info:", customerInfo);
          console.log("Cart Items:", cartItems);
        }}
      >
        Xác nhận thanh toán
      </Button>
    </Container>
  );
};

export default CheckoutPage;
