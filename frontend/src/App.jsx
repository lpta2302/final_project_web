import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import TopAppBar from "./components/TopAppBar"

const theme = createTheme({
  palette:{
    white: {
      main: '#fff',
      light: '#fff',
      dark: '#fff',
      contrastText: '#fff',
    }
  },
  components:{
    MuiButton:{
      styleOverrides:{
        text:{
          '&:hover':{
            backgroundColor: 'rgba(255,255,255,0.1)'
          }
        }
      }
    } 
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <TopAppBar/>
    </ThemeProvider>
  )
}

export default App