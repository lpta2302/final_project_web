import { Route, Routes } from "react-router-dom";
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import AuthProvider from "./context/AuthContext";
import RootLayout from './_root/RootLayout';
import { HomePage } from './_root/pages';
import './globalStyle.css'
import AdminLayout from './_root/AdminLayout';
import AdminHomePage from './_root/pages/admin/AdminHomePage';
import { adminNav, customerNav } from './constance/constance.jsx';
import { Login } from './components/index.js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SnackbarProvider } from 'notistack'

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
      <ReactQueryDevtools initialIsOpen={true} />
      <Container
        component='main'
        maxWidth='xl'
        disableGutters
      >
        <ThemeProvider theme={theme}>
          <SnackbarProvider
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          >
            <CssBaseline />
            <AuthProvider>
              <Routes>
                <Route element={<RootLayout />}>
                  <Route index element={<HomePage />} path='/' />
                  {customerNav.map(navItem =>
                    <Route path={navItem.segment} element={navItem.element} key={navItem.title} />
                  )}
                </Route>
              </Routes>
            </AuthProvider>
            <Routes>
              <Route path='/admin' element={<AdminLayout />}>
                <Route index element={<AdminHomePage />} />
                {adminNav.map(navItem =>
                  <Route path={navItem.segment} element={navItem.element} key={navItem.title} />
                )}
              </Route>
              <Route path='admin/login' element={<Login />} />
            </Routes>
          </SnackbarProvider>
        </ThemeProvider>
      </Container>
    </QueryClientProvider>
  )
}

export default App;
