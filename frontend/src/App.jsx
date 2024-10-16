import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopAppBar from "./components/TopAppBar"; // Thanh điều hướng
import MenuProductPage from "./pages/MenuProductPage"; // Trang danh sách sản phẩm
import CartPage from "./pages/ShoppingCart";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <TopAppBar />
      <Routes>
        <Route path="/cartpage" element={<CartPage />} />
        <Route path="/menupage" element={<MenuProductPage />} />
        <Route path="/homepage" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
