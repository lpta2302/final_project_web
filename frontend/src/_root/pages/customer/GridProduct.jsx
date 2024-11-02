import React, { useState } from "react";
import {
  Container,
  useMediaQuery,
  useTheme,
  Grid,
  CircularProgress,
  Typography,
} from "@mui/material";
import { TopAppBar } from "../../../components";
import SearchBar from "../../../components/ProductGrid/SearchBar";
import FilterBar from "../../../components/ProductGrid/FilterBar";
import SortBar from "../../../components/ProductGrid/SortBar";
import ProductGrid from "../../../components/ProductGrid/ProductGrid";
import { useReadAllProduct } from "../../../api/queries"; // Import useReadAllProduct

const GridProduct = () => {
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    price: "all",
    specification: "all",
    brand: "all",
    tag: "all",
    sort: "price",
  });

  // Gọi API để lấy danh sách sản phẩm
  const { data: products = [], isLoading, error } = useReadAllProduct();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSearchChange = (searchTerm) =>
    setFilters({ ...filters, search: searchTerm });
  const handleFilterChange = (name, value) =>
    setFilters({ ...filters, [name]: value });
  const handleSortChange = (name, value) =>
    setFilters({ ...filters, sort: value });
  const handleProductClick = (product) => alert(`Clicked on ${product.title}`);

  // Lọc và sắp xếp sản phẩm dựa trên bộ lọc và sắp xếp
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(filters.search.toLowerCase());
      return matchesSearch; // Bổ sung thêm các điều kiện lọc khác nếu cần
    })
    .sort((a, b) =>
      filters.sort === "price"
        ? a.price - b.price
        : a.title.localeCompare(b.title)
    );

  // Xử lý trạng thái đang tải hoặc lỗi
  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Lỗi khi tải dữ liệu</Typography>;

  return (
    <>
      <TopAppBar />
      <Container
        sx={{
          marginTop: "100px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <SearchBar onSearchChange={handleSearchChange} />
        <FilterBar onFilterChange={handleFilterChange} />
        <SortBar onSortChange={handleSortChange} />
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <ProductGrid
              products={filteredProducts}
              onProductClick={handleProductClick}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default GridProduct;
