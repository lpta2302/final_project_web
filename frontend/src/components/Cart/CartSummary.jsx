import { Paper, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import DiscountSection from "./usevoucher";

const CartSummary = ({
  totalAmount,
  shippingFee,
  discountValue,
  totalWithDiscountAndShipping,
  setDiscountValue,
  isMobile,
}) => {
  return (
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
  );
};

export default CartSummary;
