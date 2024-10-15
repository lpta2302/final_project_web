import TopAppBar from "./components/TopAppBar"
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Login from "./components/forms/Login";
import Register from "./components/forms/Register";
import ForgotPassword from "./components/forms/ForgotPassword";

function App() {
  return (
    <>
      <TopAppBar/>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dang-nhap" element={<Login />} />
        <Route path="/dang-ky" element={<Register />} />
        <Route path="/quen-mat-khau" element={<ForgotPassword />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App