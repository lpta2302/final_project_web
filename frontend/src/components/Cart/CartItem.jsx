import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const CartItem = ({
  item,
  isMobile,
  handleQuantityChange,
  handleDeleteItem,
}) => {
  return (
    <Card
      sx={{
        display: "flex",
        marginBottom: "16px",
        flexDirection: isMobile ? "column" : "row",
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: isMobile ? "100%" : 100 }}
        image={item.imageUrl}
        alt={item.name}
      />
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <CardContent>
          <Typography variant="h6">{item.name}</Typography>
          <Typography variant="body2">
            Giá: {item.price.toLocaleString()} đ
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", marginTop: "8px" }}>
            <IconButton
              onClick={() => handleQuantityChange(item.id, "decrease")}
            >
              <RemoveIcon />
            </IconButton>
            <Typography>{item.quantity}</Typography>
            <IconButton
              onClick={() => handleQuantityChange(item.id, "increase")}
            >
              <AddIcon />
            </IconButton>
          </Box>
          <Typography variant="body2" sx={{ marginTop: "8px" }}>
            Tổng cộng: {(item.price * item.quantity).toLocaleString()} đ
          </Typography>
        </CardContent>
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", padding: "8px" }}
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
  );
};

export default CartItem;
