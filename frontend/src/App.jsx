import { Route, Routes } from 'react-router-dom'
import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import AuthProvider from "./context/AuthContext";
import RootLayout from './_root/RootLayout';
import { Cart, HomePage, Profile, Voucher } from './_root/pages';
import Orders from './_root/pages/customer/Orders';
import './globalStyle.css'

const theme = createTheme({
  palette:{
    white: {
      main: '#fff',
      smoke:'f5f5f5'
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
  typography:{
    fontFamily: 'inter'
  },
  components:{
    MuiButton:{
      styleOverrides:{
        text:{
          '&:hover':{
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
          <CssBaseline/>
          <Routes>
            <Route element={<RootLayout/>}>
              <Route index element={<HomePage/>} path='/'/>
              <Route path={'/cart'} element={<Cart/>}/>
              <Route path={'/orders'} element={<Orders/>}/>
              <Route path={'/vouchers'} element={<Voucher/>}/>
              <Route path={'/profile'} element={<Profile/>}/>
            </Route>
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </Container>
  )
}

export default App