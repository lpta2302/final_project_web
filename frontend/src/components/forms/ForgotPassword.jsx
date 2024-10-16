import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Link,
  Grid2,
} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Regex for validating email format
  const emailRegex = /^\S+@\S+\.\S+$/;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email) {
      setError("Vui lòng nhập email");
    } else if (emailRegex.test(email)) {
      setError("");
      console.log("Email hợp lệ:", email);
    } else {
      setError("Vui lòng nhập đúng định dạng email");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper
        elevation={10}
        sx={{
          padding: 5,
          borderRadius: "16px",
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{
            fontSize: { xs: "1.5rem", md: "1.65rem" }, // Responsive font size
            fontWeight: "bold",
            fontFamily: "Nunito",
            mb: 2,
            textAlign: "center", // Center align title
          }}
        >
          Quên mật khẩu
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontSize: { xs: "1.2rem", md: "1.5rem" },
            fontFamily: "Nunito",
            color: "primary.main",
            fontWeight: "bold",
            textAlign: "center",
            mb: 3,
          }}
        >
          FCOMPUTER
        </Typography>
        <Typography
          variant="body1"
          sx={{ textAlign: "center", mb: 2 }}
        >
          Hãy nhập Email của bạn vào bên dưới để bắt đầu quá trình khôi phục mật khẩu.
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!error}
            helperText={error}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              height: "3rem",
              fontSize: { xs: "0.9rem", md: "1rem" }, // Responsive button font size
              fontFamily: "Nunito",
              borderRadius: "12px",
            }}
          >
            <SendIcon sx={{ mr: 1 }} />
            Gửi yêu cầu
          </Button>
        </Box>

        <Grid2 container justifyContent="center" sx={{ mt: 3 }}>
          <Grid2>
            <Link
              component="button"
              onClick={() => navigate("/login")}
              sx={{
                mt: 2,
                textDecoration: "none",
                textAlign: "center",
                display: "block",
                fontSize: { xs: "0.9rem", md: "1rem" }, // Responsive link font size
              }}
            >
              Quay lại trang đăng nhập
            </Link>
          </Grid2>
        </Grid2>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;