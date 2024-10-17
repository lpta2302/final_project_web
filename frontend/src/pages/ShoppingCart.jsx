// src/pages/CartPage.js
import { useState } from "react";
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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

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
      name: "Anh Lâm vip vãi loằn",
      price: 949000,
      quantity: 1,
    },
    {
      id: 3,
      name: "Anh Lâm kiệt gì cũng bắt hết vậy ?",
      price: 949000,
      quantity: 1,
    },
    {
      id: 4,
      name: "Vãi loằn anh Lâm",
      price: 949000,
      quantity: 1,
    },
  ]);

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

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Giỏ hàng
      </Typography>

      {cartItems.length === 0 ? (
        <div>
          <Typography variant="h6" gutterBottom>
            Giỏ hàng của bạn hiện đang trống!
          </Typography>
          <Button
            component={Link}
            to="/homepage"
            variant="contained"
            color="primary"
          >
            Quay lại Trang chủ
          </Button>
        </div>
      ) : (
        <TableContainer style={{ maxHeight: "400px" }}>
          <Table stickyHeader>
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
                  <TableCell>
                    <img
                      src="https://www.tnc.com.vn/uploads/product/XUYEN_102020/DELL-S2421HN.jpg"
                      width="200"
                    />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.price.toLocaleString()} đ</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleQuantityChange(item.id, "decrease")}
                    >
                      -
                    </Button>
                    {item.quantity}
                    <Button
                      onClick={() => handleQuantityChange(item.id, "increase")}
                    >
                      +
                    </Button>
                  </TableCell>
                  <TableCell>
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
      )}

      {cartItems.length > 0 && (
        <Typography variant="h6" style={{ marginTop: "20px" }}>
          Tổng cộng: {totalAmount.toLocaleString()} đ
          <Button
            style={{
              float: "right",
              border: "1px solid black",
              backgroundColor: "#1976d2",
              color: "white",
            }}
          >
            Thanh toán
          </Button>
        </Typography>
      )}
    </Container>
  );
};

export default CartPage;
