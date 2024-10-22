import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";

const VoucherPage = () => {
  const [vouchers, setVouchers] = useState([]);
  const [collectedVouchers, setCollectedVouchers] = useState([]); // Lưu mã đã thu thập
  const [open, setOpen] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);

  useEffect(() => {
    const mockVouchers = [
      {
        _id: "1",
        voucherName: "Giảm giá 10%",
        discountPercentage: 10,
        description: "Áp dụng cho tất cả sản phẩm",
        type: "percent",
        fixedAmount: null,
        voucherCode: "CODE10",
        expiryDate: "31/12/2024",
        applicableFor: "Khách hàng mới",
        minOrderValue: 1000000,
        appliesToBrand: "Dell",
        freeShipping: false,
      },
      {
        _id: "2",
        voucherName: "Giảm 50.000 VND",
        discountPercentage: null,
        description: "Giảm 50.000 VND cho đơn hàng trên 500.000 VND",
        type: "fixed",
        fixedAmount: 50000,
        voucherCode: "FIXED50000",
        expiryDate: "30/11/2024",
        applicableFor: "Tất cả khách hàng",
        minOrderValue: 500000,
        appliesToBrand: "Asus",
        freeShipping: true,
      },
      {
        _id: "3",
        voucherName: "Miễn phí vận chuyển",
        discountPercentage: null,
        description: "Áp dụng cho tất cả đơn hàng",
        type: "free_shipping",
        fixedAmount: null,
        voucherCode: "FREESHIP",
        expiryDate: "31/10/2024",
        applicableFor: "Tất cả khách hàng",
        minOrderValue: 0,
        appliesToBrand: null,
        freeShipping: true,
      },
    ];

    const fetchVouchers = async () => {
      try {
        // const response = await axios.get("/api/vouchers");
        // setVouchers(response.data);
        setVouchers(mockVouchers); // Dữ liệu giả lập
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu voucher", error);
      }
    };

    fetchVouchers();
  }, []);

  const handleOpen = (voucher) => {
    setSelectedVoucher(voucher);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedVoucher(null);
  };

  // Hàm thu thập mã giảm giá
  const handleCollectVoucher = (voucher) => {
    setCollectedVouchers((prevVouchers) => {
      if (!prevVouchers.includes(voucher.voucherCode)) {
        return [...prevVouchers, voucher.voucherCode];
      }
      return prevVouchers; // Nếu mã đã có trong danh sách, không thêm nữa
    });
    handleClose();
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Khuyến mãi
      </Typography>
      <Grid container spacing={4}>
        {vouchers.map((voucher) => (
          <Grid item xs={12} sm={6} md={4} key={voucher._id}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {voucher.voucherName}
                </Typography>
                {voucher.type === "percent" && (
                  <Typography variant="body1">
                    Giảm {voucher.discountPercentage}%
                  </Typography>
                )}
                {voucher.type === "fixed" && (
                  <Typography variant="body1">
                    Giảm cố định: {voucher.fixedAmount} VND
                  </Typography>
                )}
                {voucher.type === "free_shipping" && (
                  <Typography variant="body1">Miễn phí vận chuyển</Typography>
                )}
                <Typography variant="body2" color="textSecondary">
                  {voucher.description}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "10px" }}
                  onClick={() => handleOpen(voucher)}
                >
                  Xem chi tiết
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal chi tiết voucher */}
      {selectedVoucher && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{selectedVoucher.voucherName}</DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              {selectedVoucher.description}
            </Typography>
            {selectedVoucher.type === "percent" && (
              <Typography variant="body1">
                Giảm {selectedVoucher.discountPercentage}%
              </Typography>
            )}
            {selectedVoucher.type === "fixed" && (
              <Typography variant="body1">
                Giảm cố định: {selectedVoucher.fixedAmount} VND
              </Typography>
            )}
            {selectedVoucher.freeShipping && (
              <Typography variant="body1">Miễn phí vận chuyển</Typography>
            )}
            <Typography variant="body1">
              Mã áp dụng: {selectedVoucher.voucherCode}
            </Typography>
            <Typography variant="body1">
              Hạn sử dụng: {selectedVoucher.expiryDate}
            </Typography>
            <Typography variant="body1">
              Đối tượng áp dụng: {selectedVoucher.applicableFor}
            </Typography>
            <Typography variant="body1">
              Giá trị đơn hàng tối thiểu:{" "}
              {selectedVoucher.minOrderValue
                ? `${selectedVoucher.minOrderValue} VND`
                : "Không yêu cầu"}
            </Typography>
            {selectedVoucher.appliesToBrand && (
              <Typography variant="body1">
                Áp dụng cho hãng: {selectedVoucher.appliesToBrand}
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Đóng
            </Button>
            <Button
              onClick={() => handleCollectVoucher(selectedVoucher)}
              color="primary"
            >
              Thu thập mã
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Hiển thị danh sách mã đã thu thập */}
      <Typography variant="h5" style={{ marginTop: "20px" }}>
        Danh sách mã đã thu thập:
      </Typography>
      <ul>
        {collectedVouchers.map((code, index) => (
          <li key={index}>{code}</li>
        ))}
      </ul>
    </Container>
  );
};

export default VoucherPage;
