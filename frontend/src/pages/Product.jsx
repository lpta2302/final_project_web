import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  Paper,
  CircularProgress,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { useParams } from "react-router-dom";
import {
  useReadProductDetailBySlug,
  useReadAllTagAdmin,
  useReadProductByTag,
} from "../api/queries";
import ProductImages from "../components/ProductDetails/ProductImages";
import ProductGeneralInfo from "../components/ProductDetails/ProductGeneralInfo";
import ProductDescription from "../components/ProductDetails/ProductDescription";
import SpecificationTable from "../components/ProductDetails/SpecificationTable";
import ReviewsSection from "../components/ProductDetails/ReviewsSection";
import RelativeProducts from "../components/ProductDetails/RelativeProducts";

const Product = () => {
  const { slug } = useParams();
  const { data: productData, isLoading: isLoadingProduct } = useReadProductDetailBySlug(slug);

  const product = productData || null;

  if (isLoadingProduct) {
    return (
      <Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="80vh"
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container>
        <Typography variant="h5" sx={{ mt: 4 }}>
          Product not found.
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 2 }}>
        <Link underline="hover" color="inherit" href="/">
          Trang chủ
        </Link>
        <Link underline="hover" color="inherit" href="/product">
          Sản phẩm
        </Link>
        <Typography color="text.primary">{product.productName}</Typography>
      </Breadcrumbs>

      <Paper elevation={3} sx={{ padding: 4, mt: 2 }}>
        <Grid container spacing={4}>
          {/* Left Column: Product Info and Image */}
          <Grid item xs={12} md={6}>
            <ProductImages />
          </Grid>

          {/* Right Column: Specifications and Add-to-Cart */}
          <Grid item xs={12} md={6}>
            <ProductGeneralInfo />
          </Grid>
        </Grid>
      </Paper>

      {/* Product Description Section */}
      <ProductDescription />

      {/* Specification Table */}
      <SpecificationTable />

      {/* Reviews Section */}
      <ReviewsSection />

      {/* Sử dụng component RelativeProducts */}
      <RelativeProducts />
    </Container>
  );
};

export default Product;
