import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopAppBar from "./components/TopAppBar"; // Thanh điều hướng
import MenuProductPage from "./pages/MenuProductPage"; // Trang danh sách sản phẩm

function App() {
  return (
    <Router>
      <TopAppBar />
      <Routes>
        <Route path="/" element={<MenuProductPage />} />
        <Route path="/menu-products" element={<MenuProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;
