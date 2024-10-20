import React, { useState, useEffect, useRef } from 'react';
import { Container, Typography, TextField, Button, Grid2, Box, Avatar } from '@mui/material';

const ManagePersonalProfile = () => {
  // State để quản lý thông tin người dùng
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    avatar: "", // Thêm ảnh đại diện
  });

  const [error, setError] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
  });

  const fileInputRef = useRef(null);

  const defaultAvatar = "https://static-00.iconduck.com/assets.00/avatar-icon-512x512-gu21ei4u.png";

  useEffect(() => {
    const fetchUserData = async () => {
      const response = {
        avatar: "",
        username: "existing_user",
        password: "password",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "0123456789",
        birthDate: "1990-01-01",
      };

      setInputs(response); // Điền dữ liệu vào state
    };

    fetchUserData();
  }, []);

  // Hàm xử lý thay đổi thông tin form
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  // Hàm thay đổi ảnh đại diện
  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const avatarURL = URL.createObjectURL(file);
      setInputs((values) => ({ ...values, avatar: avatarURL }));
    }
  };

  // Hàm xử lý lưu thông tin
  const handleSave = (event) => {
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

    // Xử lý lưu thông tin (gửi lên backend)
    console.log("Thay đổi thông tin thành công:", inputs);
  };

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 4, mt: 4 }}>Quản lý hồ sơ</Typography>
      
      {/* Avatar và sự kiện thay đổi ảnh đại diện */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Avatar
          src={inputs.avatar || defaultAvatar} // Dùng ảnh đại diện hoặc ảnh mặc định
          sx={{ width: 100, height: 100, mr: 2, cursor: 'pointer' }}
          onClick={() => fileInputRef.current.click()} // Khi nhấp vào avatar, kích hoạt chọn file
        />
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }} // Input file ẩn đi
          onChange={handleAvatarChange}
        />
      </Box>

      <Box
        component="form"
        onSubmit={handleSave}
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField
          id="outlined-username"
          label="Tên tài khoản"
          name="username"
          fullWidth
          value={inputs.username}
          onChange={handleChange}
          error={!!error.username}
          helperText={error.username}
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
        />

        <TextField
          id="outlined-password-input"
          label="Mật khẩu"
          type="password"
          name="password"
          fullWidth
          value={inputs.password}
          onChange={handleChange}
          error={!!error.password}
          helperText={error.password}
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
        />

        <Grid2 container spacing={1}>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <TextField
              id="outlined-lastname"
              label="Họ"
              name="lastName"
              fullWidth
              value={inputs.lastName}
              onChange={handleChange}
              error={!!error.lastName}
              helperText={error.lastName}
            />
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 6 }}>
            <TextField
              id="outlined-firstname"
              label="Tên"
              name="firstName"
              fullWidth
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
          name="email"
          fullWidth
          value={inputs.email}
          onChange={handleChange}
          error={!!error.email}
          helperText={error.email}
          InputProps={{
            readOnly: true, // Email không thể thay đổi
          }}
        />

        <TextField
          id="outlined-phone"
          label="Số điện thoại"
          name="phone"
          fullWidth
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
          value={inputs.birthDate}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
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
        >
          Lưu thay đổi
        </Button>
      </Box>
    </Container>
  );
};

export default ManagePersonalProfile;