import { Route, Routes } from 'react-router-dom'
import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import AuthProvider from "./context/AuthContext";
import RootLayout from './_root/RootLayout';
import { Cart, HomePage, Profile, Voucher } from './_root/pages';
import Login from "./components/forms/Login";
import Register from "./components/forms/Register";
import ForgotPassword from "./components/forms/ForgotPassword";
import Orders from './_root/pages/customer/Orders';
import Product from './pages/Product';
import './globalStyle.css';

const theme = createTheme({
  palette: {
    white: {
      main: '#fff',
      smoke: 'f5f5f5'
    },
    black: {
      main: '#000',
      light: '#505050'
    },
    secondary: {
      main: '#09083d'
    },
    primary: {
      main: '#0672cb'
    },
  },
  typography: {
    fontFamily: 'inter'
  },
  components: {
    MuiButton: {
      styleOverrides: {
        text: {
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.035)'
          }
        }
      }
    }
  }
});

function App() {
  return (
    <Container
      component='main'
    >
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <CssBaseline />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route element={<RootLayout />}>
              <Route index element={<HomePage />} path='/' />
              <Route path={'/cart'} element={<Cart />} />
              <Route path={'/orders'} element={<Orders />} />
              <Route path={'/vouchers'} element={<Voucher />} />
              <Route path={'/profile'} element={<Profile />} />
              <Route path={'/product/productId'} element={<Product />} />
            </Route>
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </Container>
  )
}

export default App