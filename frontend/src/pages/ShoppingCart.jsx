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
  TextField, // Import thêm TextField
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

  const [discountCode, setDiscountCode] = useState(""); // State cho mã giảm giá
  const [shippingFee, setShippingFee] = useState(0); // State cho phí ship
  const [discountValue, setDiscountValue] = useState(0); // State cho giá trị giảm giá

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
      setDiscountValue(totalAmount * 0.1); // Giảm giá 10%
    } else {
      setDiscountValue(0);
    }
  };

  const totalWithDiscountAndShipping =
    totalAmount + shippingFee - discountValue;

  return (
    <>
      <Container sx={{ marginTop: "100px" }}>
        <Typography variant="h4" gutterBottom>
          Giỏ hàng
        </Typography>

        {cartItems.length === 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "80vh", // Đặt chiều cao để căn giữa theo chiều dọc
              flexDirection: "column", // Xếp chồng Typography và Button theo chiều dọc
            }}
          >
            <SentimentDissatisfiedIcon
              style={{ fontSize: 80, color: "#757575", marginBottom: "16px" }} // Icon lớn, màu xám, cách chữ một chút
            />
            <Typography variant="h6" style={{ fontSize: "30px" }} gutterBottom>
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
          </div>
        ) : (
          <>
            <TableContainer sx={{ maxHeight: "400px", overflowX: "auto" }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: "200px" }}>ẢNH</TableCell>
                    <TableCell sx={{ minWidth: "150px" }}>SẢN PHẨM</TableCell>
                    <TableCell sx={{ width: "170px" }}>GIÁ</TableCell>
                    <TableCell sx={{ minWidth: "170px", paddingLeft: "27px" }}>
                      SỐ LƯỢNG
                    </TableCell>
                    <TableCell sx={{ width: "150px" }}>TỔNG CỘNG</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell sx={{ width: "200px" }}>
                        <img
                          src="https://www.tnc.com.vn/uploads/product/XUYEN_102020/DELL-S2421HN.jpg"
                          width="100"
                          alt={item.name}
                        />
                      </TableCell>
                      <TableCell sx={{ minWidth: "150px" }}>
                        {item.name}
                      </TableCell>
                      <TableCell sx={{ width: "150px" }}>
                        {item.price.toLocaleString()} đ
                      </TableCell>
                      <TableCell sx={{ width: "170px", padding: "0" }}>
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
                      <TableCell sx={{ width: "150px" }}>
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

            {/* Tính phí ship và mã giảm giá */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              {/* Mã giảm giá */}
              <div>
                <TextField
                  label="Nhập mã giảm giá"
                  variant="outlined"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                />
                <Button
                  sx={{ marginLeft: "10px" }}
                  variant="contained"
                  onClick={handleApplyDiscount}
                >
                  Áp dụng
                </Button>
              </div>

              {/* Phí ship */}
              <div>
                <TextField
                  label="Phí ship"
                  variant="outlined"
                  type="number"
                  value={shippingFee}
                  onChange={(e) => setShippingFee(parseInt(e.target.value))}
                />
              </div>
            </div>

            {/* Tổng cộng */}
            <Typography
              variant="h6"
              sx={{ marginTop: "20px", textAlign: "right" }}
            >
              Tổng tiền: {totalWithDiscountAndShipping.toLocaleString()} đ
              <Button
                sx={{
                  marginLeft: "20px",
                  border: "1px solid black",
                  backgroundColor: "#1976d2",
                  color: "white",
                }}
              >
                Thanh toán
              </Button>
            </Typography>
          </>
        )}
      </Container>
    </>
  );
};

export default CartPage;
