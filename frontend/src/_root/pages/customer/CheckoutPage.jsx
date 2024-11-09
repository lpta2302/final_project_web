import { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Grid,
  Paper,
} from "@mui/material";
import { useGetCurrentUser, useReadOwnCart, useReadAllVouchers } from "../../../api/queries";

function CheckoutPage() {
  const { data: currentUser } = useGetCurrentUser();
  const { data: cartData, isLoading: isCartLoading } = useReadOwnCart(currentUser?._id);
  const { data: vouchersData, isLoading: isVouchersLoading } = useReadAllVouchers();

  // Lấy thời gian hiện tại và cộng thêm 5 ngày
  const currentDateTime = new Date();
  const takeOrderTime = new Date(currentDateTime);
  takeOrderTime.setDate(takeOrderTime.getDate() + 5);

  const [orderData, setOrderData] = useState({
    userId: currentUser?._id || "",
    paymentStatus: "unpaid",
    paymentMethod: "credit_card",
    shippingCost: 58500,
    orderNote: "",
    expectedReceiveTime: currentDateTime.toISOString().slice(0, 16),
    takeOrderTime: takeOrderTime.toISOString().slice(0, 16),
    address: "",
    voucher: [],
    cart: {
      client: currentUser?._id || "",
      cartItems: [],
    },
  });

  useEffect(() => {
    if (cartData) {
      setOrderData((prevData) => ({
        ...prevData,
        cart: {
          ...prevData.cart,
          cartItems: cartData.cartItems.map((item) => ({
            spec: item.spec._id,
            productName: item.spec.products.productName,
            price: item.spec.price,
            quantity: item.quantity,
          })),
        },
      }));
    }
  }, [cartData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNestedChange = (e, index) => {
    const { name, value } = e.target;
    const cartItems = [...orderData.cart.cartItems];
    cartItems[index][name] = value;
    setOrderData((prevData) => ({
      ...prevData,
      cart: { ...prevData.cart, cartItems },
    }));
  };

  const handleAddVoucher = (e) => {
    const { value } = e.target;
    setOrderData((prevData) => ({
      ...prevData,
      voucher: value, // value là mảng các voucher đã chọn
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order Data:", orderData);
    // Gửi orderData lên server
  };

  if (isCartLoading) return <Typography>Loading cart data...</Typography>;
  if (isVouchersLoading) return <Typography>Loading vouchers...</Typography>;

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Order Form
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="User ID"
            name="userId"
            value={orderData.userId}
            onChange={handleChange}
            margin="normal"
            disabled
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Payment Status</InputLabel>
            <Select
              name="paymentStatus"
              value={orderData.paymentStatus}
              onChange={handleChange}
            >
              <MenuItem value="unpaid">Unpaid</MenuItem>
              <MenuItem value="paid">Paid</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Payment Method</InputLabel>
            <Select
              name="paymentMethod"
              value={orderData.paymentMethod}
              onChange={handleChange}
            >
              <MenuItem value="credit_card">Credit Card</MenuItem>
              <MenuItem value="paypal">Paypal</MenuItem>
              <MenuItem value="bank_transfer">Bank Transfer</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            type="number"
            label="Shipping Cost"
            name="shippingCost"
            value={orderData.shippingCost}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Order Note"
            name="orderNote"
            value={orderData.orderNote}
            onChange={handleChange}
            multiline
            rows={4}
            margin="normal"
          />
          <TextField
            fullWidth
            type="datetime-local"
            label="Expected Receive Time"
            name="expectedReceiveTime"
            value={orderData.expectedReceiveTime}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            type="datetime-local"
            label="Take Order Time"
            name="takeOrderTime"
            value={orderData.takeOrderTime}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={orderData.address}
            onChange={handleChange}
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Vouchers</InputLabel>
            <Select
              name="voucher"
              multiple
              value={orderData.voucher}
              onChange={handleAddVoucher}
              renderValue={(selected) =>
                selected
                  .map(
                    (id) =>
                      vouchersData.find((voucher) => voucher._id === id)
                        ?.voucherName || id
                  )
                  .join(", ")
              }
            >
              {vouchersData.map((voucher) => (
                <MenuItem key={voucher._id} value={voucher._id}>
                  {voucher.voucherName} - {voucher.discountPercentage}% off
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography variant="h6" gutterBottom mt={2}>
            Cart Items
          </Typography>
          {orderData.cart.cartItems.map((item, index) => (
            <Grid container spacing={2} key={index}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Product Name"
                  name="productName"
                  value={item.productName}
                  margin="normal"
                  disabled
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type="number"
                  label="Quantity"
                  name="quantity"
                  value={item.quantity}
                  onChange={(e) => handleNestedChange(e, index)}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  label="Price"
                  name="price"
                  value={item.price}
                  margin="normal"
                  disabled
                />
              </Grid>
            </Grid>
          ))}
          <Box mt={4}>
            <Button type="submit" variant="contained" color="primary">
              Submit Order
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default CheckoutPage;
