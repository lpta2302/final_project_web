import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, Paper } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  // Biểu thức chính quy để kiểm tra định dạng email hợp lệ
  const emailRegex = /^\S+@\S+\.\S+$/; // Kiểm tra email hợp lệ

  // Hàm xử lý khi người dùng bấm nút
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email) {
      setError("Vui lòng nhập email");
    } else if (emailRegex.test(email)) {
      // Nếu là email hợp lệ
      setError(""); // Xóa lỗi
      console.log("Email hợp lệ:", email);
      // Gửi yêu cầu quên mật khẩu với email
    } else {
      // Nếu không phải email hợp lệ
      setError("Vui lòng nhập đúng định dạng email");
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper
        elevation={10}
        sx={{
          mt: 8,
          padding: 2,
        }}
      >
        <Typography 
          variant="h5" 
          component="h1" 
          sx={{ textAlign: "center", mb: 2 }}
        >
          Quên mật khẩu
        </Typography>
        <Box 
          component="form" 
          onSubmit={handleSubmit} 
          noValidate 
          sx={{ mt: 1 }}
        >
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!error}
            helperText={error} // Hiển thị thông báo lỗi nếu có
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ backgroundColor: "#09083D" }}
          >
            <SendIcon sx={{ mr: 2 }} />
            Gửi yêu cầu
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;