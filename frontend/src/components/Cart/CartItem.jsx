import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useMediaQuery } from "@mui/material";

const CartItem = ({ item, handleQuantityChange, handleDeleteItem }) => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        marginBottom: "16px",
        padding: "16px",
        justifyContent: "space-between",
      }}
    >
      {/* Hình ảnh sản phẩm */}
      <CardMedia
        component="img"
        sx={{
          width: isMobile ? "100%" : 120,
          height: isMobile ? "auto" : 120,
          objectFit: "cover",
          borderRadius: "8px",
          marginBottom: isMobile ? "16px" : 0,
        }}
        image={item.image}
        alt={item.name}
      />

      {/* Thông tin và hành động */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          paddingLeft: isMobile ? 0 : "16px",
        }}
      >
        <CardContent sx={{ padding: "8px 0" }}>
          <Typography
            variant="h6"
            noWrap
            sx={{
              textAlign: isMobile ? "center" : "left",
              fontSize: isMobile ? "1rem" : "1.25rem",
            }}
          >
            {item.name}
          </Typography>

          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ textAlign: isMobile ? "center" : "left" }}
          >
            Giá: {item.price.toLocaleString()} đ
          </Typography>

          {/* Thay đổi số lượng */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: isMobile ? "center" : "flex-start",
              marginTop: "8px",
              gap: "8px",
            }}
          >
            <IconButton
              onClick={() => handleQuantityChange(item.id, "decrease")}
              size="small"
            >
              <RemoveIcon />
            </IconButton>
            <Typography
              variant="body1"
              sx={{ minWidth: "24px", textAlign: "center" }}
            >
              {item.quantity}
            </Typography>
            <IconButton
              onClick={() => handleQuantityChange(item.id, "increase")}
              size="small"
            >
              <AddIcon />
            </IconButton>
          </Box>

          <Typography
            variant="body2"
            sx={{
              marginTop: "8px",
              textAlign: isMobile ? "center" : "left",
              fontWeight: "bold",
              color: "green",
            }}
          >
            Tổng cộng: {(item.price * item.quantity).toLocaleString()} đ
          </Typography>
        </CardContent>

        {/* Divider cho mobile */}
        {isMobile && <Divider sx={{ marginY: "8px" }} />}

        {/* Nút xóa sản phẩm */}
        <Box
          sx={{
            display: "flex",
            justifyContent: isMobile ? "center" : "flex-end",
            paddingTop: "8px",
          }}
        >
          <Button
            onClick={() => handleDeleteItem(item.id)}
            startIcon={<DeleteIcon />}
            color="error"
            size="small"
          >
            Xóa
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default CartItem;
