import { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Link,
  Grid2,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const [error, setError] = useState({ username: "", password: "" });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleLogin = (event) => {
    event.preventDefault();

    let tempError = { username: "", password: "" };

    if (!inputs.username) {
      tempError.username = "Tên tài khoản không được để trống";
    }

    if (!inputs.password) {
      tempError.password = "Mật khẩu không được để trống";
    }

    if (tempError.username || tempError.password) {
      setError(tempError);
      return;
    }

    setError({ username: "", password: "" });
    console.log("Login successful with username:", inputs.username, ", pass:", inputs.password);
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper
        elevation={10}
        sx={{
          mt: 8,
          padding: 2,
          borderRadius: "16px",
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{
            fontSize: { xs: "1.5rem", sm: "1.65rem" },
            fontWeight: "bold",
            mb: 2,
          }}
        >
          Đăng nhập
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontSize: { xs: "1.2rem", sm: "1.5rem" },
            fontFamily: "Nunito",
            color: "primary.main",
            fontWeight: "bold",
            textAlign: "center",
            mb: 3,
          }}
        >
          FCOMPUTER
        </Typography>
        <Box
          component="form"
          onSubmit={handleLogin}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            required
            id="outlined-required"
            label="Tên tài khoản"
            name="username"
            fullWidth
            autoFocus
            value={inputs.username}
            onChange={handleChange}
            error={!!error.username}
            helperText={error.username}
            sx={{
              fontSize: "1rem",
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
              },
            }}
          />

          <TextField
            required
            id="outlined-password-input"
            label="Mật khẩu"
            type="password"
            name="password"
            fullWidth
            value={inputs.password}
            onChange={handleChange}
            error={!!error.password}
            helperText={error.password}
            sx={{
              fontSize: "1rem",
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
              },
            }}
          />
          <Grid2 container justifyContent="space-between" alignItems="center">
            <FormControlLabel
              control={<Checkbox value="remember" />}
              label={
                <Typography sx={{ fontSize: "1rem" }}>
                  Nhớ mật khẩu
                </Typography>
              }
            />
            <Link
              component="button"
              type="button"
              onClick={handleForgotPassword}
              sx={{ fontSize: "1rem" }}
            >
              Quên mật khẩu?
            </Link>
          </Grid2>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 1,
              height: "3rem",
              fontSize: "1rem",
              borderRadius: "12px",
            }}
          >
            <LoginIcon sx={{ mr: 2 }} />
            Đăng nhập
          </Button>
        </Box>
        <Grid2 container justifyContent="center" sx={{ mt: 3 }}>
          <Grid2>
            Bạn chưa có tài khoản?{" "}
            <Link
              onClick={handleRegister}
              sx={{ fontSize: "1rem", cursor: "pointer" }}
            >
              Đăng ký ngay
            </Link>
          </Grid2>
        </Grid2>
      </Paper>
    </Container>
  );
};

export default Login;