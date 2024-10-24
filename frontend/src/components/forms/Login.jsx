import { forwardRef, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid2,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import PropTypes from "prop-types";
import { useLogin } from "../../api/queries";
import { enqueueSnackbar as toaster } from 'notistack';

const Login = ({ setModalType, isAdmin }) => {
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const [error, setError] = useState({ username: false, password: false });
  const [errorMessage, setErrorMessage] = useState("");

  const { mutateAsync: login  } = useLogin();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    let tempError = { username: false, password: false };

    // Kiểm tra tên tài khoản
    if (!inputs.username) {
      tempError.username = true;
    }

    // Kiểm tra mật khẩu
    if (!inputs.password) {
      tempError.password = true;
    }

    // Nếu thiếu tên tài khoản hoặc mật khẩu, hiển thị lỗi
    if (tempError.username || tempError.password) {
      setError(tempError);
      toaster('Tên tài khoản hoặc mật khẩu không hợp lệ', { variant: 'error' });
      setErrorMessage("Tên tài khoản hoặc mật khẩu không hợp lệ");
      return;
    }

    try {
      const token = await login(inputs);
  
      if (token) {
        console.log(token)
        toaster('Đăng nhập thành công!', { variant: 'success' });
        console.log("Login successful with account:", token);
      } else {
        console.log(token)
        toaster('Tên tài khoản hoặc mật khẩu không đúng!', { variant: 'error' });
        setError({ username: true, password: true });
        setErrorMessage("Tên tài khoản hoặc mật khẩu không đúng");
      }
    } catch (error) {
      console.error(error);
      toaster('Lỗi xử lý đăng nhập!', { variant: 'error' });
    }
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
        <Typography component="div" variant="h6" sx={{ mb: 2 }}>
          Đăng nhập
        </Typography>
        <Typography
          variant="h5"
          sx={{
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
            error={error.username}
            helperText={error.username ? "" : ""}
            sx={{
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
            error={error.password}
            helperText={errorMessage}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
              },
            }}
          />
          <Grid2 container justifyContent="space-between" alignItems="center">
            <FormControlLabel
              control={<Checkbox value="remember" />}
              label={<Typography>Nhớ mật khẩu</Typography>}
            />
            <Typography
              onClick={() => setModalType('forgot-password')}
              color="primary.main"
              sx={{ textDecoration: 'underline', '&:hover': { cursor: 'pointer' } }}
            >
              Quên mật khẩu?
            </Typography>
          </Grid2>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 1,
              height: "3rem",
              borderRadius: "12px",
            }}
          >
            <LoginIcon sx={{ mr: 2 }} />
            Đăng nhập
          </Button>
        </Box>
        {!isAdmin && (
          <Box sx={{ display: 'flex', mt: 4, mb: 2 }}>
            Bạn chưa có tài khoản?
            <Typography
              onClick={() => setModalType('register')}
              color="primary.main"
              sx={{ ml: 1, textDecoration: 'underline', '&:hover': { cursor: 'pointer' } }}
            >
              Đăng ký ngay
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

Login.propTypes = {
  setModalType: PropTypes.func,
  isAdmin: PropTypes.bool,
};

export default forwardRef(Login);
