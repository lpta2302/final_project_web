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
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useNavigate } from "react-router-dom";

const Register = () => {
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
  const [isAgree, setIsAgree] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleRegister = (event) => {
    event.preventDefault();
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
      tempError.username = "Tên tài khoản không được để trống";
    }
    if (!inputs.password) {
      tempError.password = "Mật khẩu không được để trống";
    }
    if (!inputs.firstName) {
      tempError.firstName = "Tên không được để trống";
    }
    if (!inputs.lastName) {
      tempError.lastName = "Họ không được để trống";
    }
    if (!inputs.email) {
      tempError.email = "Email không được để trống";
    } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
      tempError.email = "Email không hợp lệ";
    }
    if (!inputs.phone) {
      tempError.phone = "Số điện thoại không được để trống";
    } else if (!/^\d+$/.test(inputs.phone)) {
      tempError.phone = "Số điện thoại không hợp lệ";
    }

    if (Object.values(tempError).some((error) => error)) {
      setError(tempError);
      return;
    }

    setError({
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      birthDate: "",
    });
    console.log("Đăng ký thành công với:", inputs);
  };

  const handleLogin = () => {
    navigate("/login");
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
            fontSize: "1.65rem",
            fontWeight: "bold",
            mb: 2,
          }}
        >
          Đăng ký
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontSize: "1.5rem",
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
          onSubmit={handleRegister}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            required
            id="outlined-username"
            label="Tên tài khoản"
            name="username"
            fullWidth
            autoFocus
            sx={{
              fontSize: "1rem",
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
              },
            }}
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
            sx={{
              fontSize: "1rem",
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
              },
            }}
            value={inputs.password}
            onChange={handleChange}
            error={!!error.password}
            helperText={error.password}
          />
          <Grid2 container spacing={2}>
            <Grid2 xs={12} sm={6}>
              <TextField
                id="outlined-lastname"
                label="Họ"
                name="lastName"
                required
                fullWidth
                sx={{
                  fontSize: "1rem",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
                value={inputs.lastName}
                onChange={handleChange}
                error={!!error.lastName}
                helperText={error.lastName}
              />
            </Grid2>
            <Grid2 xs={12} sm={6}>
              <TextField
                id="outlined-firstname"
                label="Tên"
                name="firstName"
                required
                fullWidth
                sx={{
                  fontSize: "1rem",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
                value={inputs.firstName}
                onChange={handleChange}
                error={!!error.firstName}
                helperText={error.firstName}
              />
            </Grid2>
          </Grid2>
          <TextField
            id="outlined-email"
            label="Email"
            type="email"
            name="email"
            required
            fullWidth
            sx={{
              fontSize: "1rem",
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
              },
            }}
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
            sx={{
              fontSize: "1rem",
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
              },
            }}
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
            sx={{
              fontSize: "1rem",
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
              },
            }}
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
            sx={{
              mt: 1,
              height: "3rem",
              fontSize: "1rem",
              borderRadius: "12px",
            }}
            disabled={!isAgree}
          >
            <PersonAddIcon sx={{ mr: 2 }} />
            Đăng ký
          </Button>
        </Box>
        <Grid2 container justifyContent="center" sx={{ mt: 3 }}>
          <Grid2>
            <>
              Bạn đã có tài khoản?{" "}
              <Link
                onClick={handleLogin}
                sx={{
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
              >
                Đăng nhập ngay
              </Link>
            </>
          </Grid2>
        </Grid2>
      </Paper>
    </Container>
  );
};

export default Register;