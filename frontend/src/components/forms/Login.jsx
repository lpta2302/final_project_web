import { useState } from "react";
import {
  Container,
  Paper,
  Avatar,
  Typography,
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid2,
  Link,
} from "@mui/material";
import LockOutLinedIcon from "@mui/icons-material/LockOutlined";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [inputs, setInputs] = useState({ username: "", password: "" }); // Khởi tạo state cho inputs
  const [error, setError] = useState({ username: "", password: "" });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value })); // Cập nhật state cho inputs
  };

  const handleLogin = (event) => {
    event.preventDefault(); // Ngăn không cho form reload trang

    // Kiểm tra các trường đầu vào
    let tempError = { username: "", password: "" };

    if (!inputs.username) {
      tempError.username = "Tên tài khoản không được để trống"; // Cập nhật lỗi nếu username trống
    }

    if (!inputs.password) {
      tempError.password = "Mật khẩu không được để trống"; // Cập nhật lỗi nếu password trống
    }

    if (tempError.username || tempError.password) {
      setError(tempError); // Cập nhật trạng thái lỗi
      return;
    }

    // Nếu tên tài khoản và mật khẩu hợp lệ
    setError({ username: "", password: "" }); // Xóa thông báo lỗi nếu có
    console.log("Login successful with username:", inputs.username, ", pass:", inputs.password);
    // Thực hiện điều hướng hoặc các hành động sau khi đăng nhập thành công
  };

  // Hàm xử lý chuyển hướng
  const handleForgotPassword = () => {
    navigate("/forgot-password"); // Điều hướng sang trang Quên mật khẩu
  };

  const handleRegister = () => {
    navigate("/register"); // Điều hướng sang trang Đăng ký
  };

  return (
    <Container maxWidth="xs">
      <Paper
        elevation={10} // Đổ bóng
        sx={{
          mt: 8, // marginTop
          padding: 2,
        }}
      >
        <Avatar
          sx={{
            mx: "auto", // margin X (left & right)
            bgcolor: "#1D3557",
            textAlign: "center",
            mb: 1, // marginBottom
          }}
        >
          <LockOutLinedIcon sx={{ color: "#ffffff" }} />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
          Đăng nhập
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            required
            id="outlined-required"
            label="Tên tài khoản"
            name="username"
            fullWidth
            autoFocus
            sx={{ mb: 2 }}
            value={inputs.username} // Gán giá trị cho username từ inputs
            onChange={handleChange} // Cập nhật state khi nhập liệu
            error={!!error.username} // Nếu có lỗi, viền đỏ
            helperText={error.username} // Hiển thị thông báo lỗi
          />
          <TextField
            id="outlined-password-input"
            label="Mật khẩu"
            type="password"
            name="password"
            autoComplete="current-password"
            fullWidth
            required
            value={inputs.password} // Gán giá trị cho password từ inputs
            onChange={handleChange} // Cập nhật state khi nhập liệu
            error={!!error.password} // Nếu có lỗi, viền đỏ
            helperText={error.password} // Hiển thị thông báo lỗi
          />
          
          <FormControlLabel
            control={<Checkbox value="remember" />}
            label="Nhớ mật khẩu"
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 1, backgroundColor: "#1D3557" }}
          >
            <LoginIcon sx={{ mr: 2 }} />
            Đăng nhập
          </Button>
        </Box>
        <Grid2 container justifyContent="space-between" sx={{ mt: 1 }}>
          <Grid2>
            <Link onClick={handleForgotPassword} sx={{ cursor: "pointer" }}>
              Quên mật khẩu?
            </Link>
          </Grid2>
          <Grid2>
            <Link onClick={handleRegister} sx={{ cursor: "pointer" }}>
              Đăng ký
            </Link>
          </Grid2>
        </Grid2>
      </Paper>
    </Container>
  );
};

export default Login;