import { Route, Routes } from "react-router-dom";
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import AuthProvider from "./context/AuthContext";
import RootLayout from "./_root/RootLayout";
import { HomePage, Profile } from "./_root/pages";
import "./globalStyle.css";
import AdminLayout from "./_root/AdminLayout";
import AdminHomePage from "./_root/pages/admin/AdminHomePage";
import { adminNav, customerNav } from "./constance/constance.jsx";
import { Login } from "./components/index.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SnackbarProvider } from "notistack";
import ManagePersonalProfile from "./pages/ManagePersonalProfile.jsx";
import ManagePersonalOrder from "./pages/ManagePersonalOrder.jsx";
import Favorite from "./pages/Favorite.jsx";
import Product from "./pages/Product.jsx";
import GridProduct from "./pages/GridProduct.jsx";
import CheckoutPage from "./_root/pages/customer/Checkoutpage.jsx";
import CustomerProfile from "./_root/pages/customer/CustomProfile.jsx";

const muiTheme = createTheme({
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
      main: "#1463f3",
    },
    error: {
      main: "#f53935",
    },
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
          backgroundColor: "#fff",
        },
      },
    },
  },
});

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <Container component="main" maxWidth="xl" disableGutters>
        <ThemeProvider theme={theme}>
          <SnackbarProvider
            anchorOrigin={{ horizontal: "right", vertical: "top" }}
            autoHideDuration={3000}
          >
            <CssBaseline />
            <AuthProvider>
              <Routes>
                <Route element={<RootLayout />}>
                  <Route index element={<HomePage />} path="/" />

                  <Route path="/profile" element={<Profile />} />
                  <Route
                    path="/manage-profile"
                    element={<ManagePersonalProfile />}
                  />
                  <Route
                    path="/manage-order"
                    element={<ManagePersonalOrder />}
                  />
                  <Route path="/favorite" element={<Favorite />} />
                  <Route path="/product/:productId" element={<Product />} />
                  <Route path="/productgrid" element={<GridProduct />} />
                  <Route path="/checkoutpage" element={<CheckoutPage />} />
                  <Route path="/customprofile" element={<CustomerProfile />} />

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
              </Route>
              <Route path="admin/login" element={<Login />} />
            </Routes>
          </SnackbarProvider>
        </ThemeProvider>
      </Container>
    </QueryClientProvider>
  );
}

export default App;
