import { useState } from "react";
import React from "react";
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
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useNavigate } from "react-router-dom";

const Register = () => {
  // Sử dụng một đối tượng để lưu trữ tất cả các giá trị đầu vào
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
  });
  const [error, setError] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  // State để kiểm tra checkbox đã được tick chưa
  const [isAgree, setIsAgree] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleRegister = (event) => {
    event.preventDefault(); // Ngăn không cho form reload trang

    // Kiểm tra các trường đầu vào
    let tempError = {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      birthDate: "",
    };

    if (!inputs.username) {
      tempError.username = "Tên tài khoản không được để trống"; // Cập nhật lỗi nếu username trống
    }

    if (!inputs.password) {
      tempError.password = "Mật khẩu không được để trống"; // Cập nhật lỗi nếu password trống
    }

    if (!inputs.firstName) {
      tempError.firstName = "Tên không được để trống"; // Cập nhật lỗi nếu tên trống
    }

    if (!inputs.lastName) {
      tempError.lastName = "Họ không được để trống"; // Cập nhật lỗi nếu họ trống
    }

    if (!inputs.email) {
      tempError.email = "Email không được để trống"; // Cập nhật lỗi nếu email trống
    } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
      tempError.email = "Email không hợp lệ"; // Kiểm tra định dạng email
    }

    if (!inputs.phone) {
      tempError.phone = "Số điện thoại không được để trống"; // Cập nhật lỗi nếu phone trống
    } else if (!/^\d+$/.test(inputs.phone)) {
      tempError.phone = "Số điện thoại không hợp lệ"; // Kiểm tra định dạng số điện thoại
    }

    if (Object.values(tempError).some((error) => error)) {
      setError(tempError); // Cập nhật trạng thái lỗi
      return;
    }

    // Nếu tất cả các trường hợp lệ
    setError({
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      birthDate: "",
    }); // Xóa thông báo lỗi nếu có
    console.log("Đăng ký thành công với:", inputs);
    // Thực hiện điều hướng hoặc các hành động sau khi đăng ký thành công
  };

  const handleLogin = () => {
    navigate("/dang-nhap"); // Điều hướng sang trang Đăng nhập
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
          <AppRegistrationIcon sx={{ color: "#ffffff" }} />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
          Đăng ký
        </Typography>
        <Box component="form" onSubmit={handleRegister} noValidate sx={{ mt: 1 }}>
          <TextField
            required
            id="outlined-username"
            label="Tên tài khoản"
            name="username"
            fullWidth
            autoFocus
            sx={{ mb: 2 }}
            value={inputs.username}
            onChange={handleChange}
            error={!!error.username}
            helperText={error.username}
          />
          <TextField
            id="outlined-password-input"
            label="Mật khẩu"
            type="password"
            name="password"
            autoComplete="current-password"
            fullWidth
            required
            sx={{ mb: 2 }}
            value={inputs.password}
            onChange={handleChange}
            error={!!error.password}
            helperText={error.password}
          />
          <TextField
            id="outlined-firstname"
            label="Tên"
            name="firstName"
            required
            fullWidth
            sx={{ mb: 2 }}
            value={inputs.firstName}
            onChange={handleChange}
            error={!!error.firstName}
            helperText={error.firstName}
          />
          <TextField
            id="outlined-lastname"
            label="Họ"
            name="lastName"
            required
            fullWidth
            sx={{ mb: 2 }}
            value={inputs.lastName}
            onChange={handleChange}
            error={!!error.lastName}
            helperText={error.lastName}
          />
          <TextField
            id="outlined-email"
            label="Email"
            type="email"
            name="email"
            required
            fullWidth
            sx={{ mb: 2 }}
            value={inputs.email}
            onChange={handleChange}
            error={!!error.email}
            helperText={error.email}
          />
          <TextField
            id="outlined-phone"
            label="Số điện thoại"
            type="tel"
            name="phone"
            required
            fullWidth
            sx={{ mb: 2 }}
            value={inputs.phone}
            onChange={handleChange}
            error={!!error.phone}
            helperText={error.phone}
          />
          <TextField
            id="outlined-birthdate"
            label="Ngày sinh"
            type="date"
            name="birthDate"
            fullWidth
            sx={{ mb: 2 }}
            value={inputs.birthDate}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isAgree}
                onChange={(e) => setIsAgree(e.target.checked)}
                value="agree"
              />
            }
            label={
              <>
                Tôi đồng ý với{" "}
                <Link href="/dieu-khoan-bao-mat" target="_blank">
                  điều khoản bảo mật cá nhân
                </Link>
              </>
            }
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 1, backgroundColor: "#1D3557" }}
            disabled={!isAgree} // Nút Đăng ký sẽ bị vô hiệu hóa nếu checkbox không được tích
          >
            <PersonAddIcon sx={{ mr: 2 }} />
            Đăng ký
          </Button>
        </Box>
        <Grid2 container justifyContent="flex-end" sx={{ mt: 1 }}>
          <Grid2>
            <Link onClick={handleLogin} sx={{ cursor: "pointer" }}>
              Đăng nhập
            </Link>
          </Grid2>
        </Grid2>
      </Paper>
    </Container>
  );
};

export default Register;