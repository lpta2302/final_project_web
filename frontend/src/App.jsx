import { Route, Routes } from 'react-router-dom'
import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import AuthProvider from "./context/AuthContext";
import RootLayout from './_root/RootLayout';
import { HomePage, Profile } from './_root/pages';
import Login from "./components/forms/Login";
import './globalStyle.css'
import AdminLayout from './_root/AdminLayout';
import AdminHomePage from './_root/pages/admin/AdminHomePage';
import { adminNav, customerNav } from './constance/constance.jsx';
import ManagePersonalProfile from './pages/ManagePersonalProfile.jsx';
import ManagePersonalOrder from './pages/ManagePersonalOrder.jsx';
import Favorite from './pages/Favorite.jsx';

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
    <Container component="main">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Routes>
            <Route element={<RootLayout />}>
              <Route index element={<HomePage />} path="/" />
              <Route path={"/profile"} element={<Profile />} />
              <Route path="/manage-profile" element={<ManagePersonalProfile />} />
              <Route path="/manage-order" element={<ManagePersonalOrder />} />
              <Route path="/favorite" element={<Favorite />} />
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
        </Routes>
      </ThemeProvider>
    </Container>
  );
}

export default App;
