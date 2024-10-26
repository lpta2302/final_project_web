import { Route, Routes } from "react-router-dom";
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import AuthProvider from "./context/AuthContext";
import RootLayout from "./_root/RootLayout";

import Login from "./components/forms/Login";
import "./globalStyle.css";
import AdminLayout from "./_root/AdminLayout";
import AdminHomePage from "./_root/pages/admin/AdminHomePage";
import { adminNav, customerNav } from "./constance/constance.jsx";
import HomePage from "./_root/pages/customer/HomePage.jsx";
import GridProduct from "./_root/pages/customer/GridProduct.jsx";
import CheckoutPage from "./_root/pages/customer/Checkoutpage.jsx";
import CustomerProfile from "./_root/pages/customer/CustomProfile.jsx";
import VoucherPage from "./_root/pages/customer/Voucher.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const theme = createTheme({
  palette: {
    white: {
      main: "#fff",
      smoke: "f5f5f5",
    },
    black: {
      main: "#000",
      light: "#505050",
    },
    secondary: {
      main: "#09083d",
    },
    primary: {
      main: "#0672cb",
    },
    error: {
      main: "#f53935"
    }
  },
  typography: {
    fontFamily: "inter",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        text: {
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.035)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff'
        }
      }
    }
  },
});

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Container component="main"
        sx={{
          p: {
            md: '12px', // Padding of 12px for medium screens and up
            lg: '0',    // Padding of 0 for large screens and up
          },
        }}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <Routes>
              <Route element={<RootLayout />}>
                <Route index element={<HomePage />} path="/" />
                {customerNav.map((navItem) => (
                  <Route
                    path={navItem.segment}
                    element={navItem.element}
                    key={navItem.title}
                  />
                ))}
              </Route>
            </Routes>
          </AuthProvider>
          <Routes>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminHomePage />} />
              {adminNav.map((navItem) => (
                <Route
                  path={navItem.segment}
                  element={navItem.element}
                  key={navItem.title}
                />
              ))}
              <Route path="login" element={<Login admin />} />
            </Route>
            <Route path="/productgrid" element={<GridProduct />} />
            <Route path="/checkoutpage" element={<CheckoutPage />} />
            <Route path="/profile" element={<CustomerProfile />} />
          </Routes>
        </ThemeProvider>
      </Container>
    </QueryClientProvider>
  );
}

export default App;
