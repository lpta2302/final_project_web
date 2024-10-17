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

const Login = ({ setModalType }) => {
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const [error, setError] = useState({ username: "", password: "" });


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
          component="div"
          variant="h6"
          sx={{
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
            <Typography
              onClick={()=>setModalType('forgot-password')}
              color='primary.main'
              sx={{ fontSize: "1rem", textDecoration: 'underline', '&:hover': { cursor: 'pointer' } }}
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
              fontSize: "1rem",
              borderRadius: "12px",
            }}
          >
            <LoginIcon sx={{ mr: 2 }} />
            Đăng nhập
          </Button>
        </Box>
        <Box
          sx={{ display: 'flex', mt: 4, mb: 2}}
        >
          Bạn chưa có tài khoản?
          <Typography
            onClick={()=>setModalType('register')}
            color='primary.main'
            sx={{ ml: 1, fontSize: "1rem", textDecoration: 'underline', '&:hover': { cursor: 'pointer' } }}
          >
            Đăng ký ngay
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

Login.propTypes = {
  setModalType: PropTypes.func
}

export default forwardRef(Login);