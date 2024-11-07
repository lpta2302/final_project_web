import React from "react";
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
} from "../api/queries";
import ProductImages from "../components/ProductDetails/ProductImages";
import ReviewsSection from "../components/ProductDetails/ReviewsSection";
import SpecificationTable from "../components/ProductDetails/SpecificationTable";
import ProductGeneralInfo from "../components/ProductDetails/ProductGeneralInfo";
import ProductDescription from "../components/ProductDetails/ProductDescription";

const Product = () => {
  const { slug } = useParams();

  const { data: productData, isLoading } = useReadProductDetailBySlug(slug);

  const product = productData ? productData : null;
  const specs = Array.isArray(product?.specs) ? product.specs : [];

  if (isLoading) {
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

  if (!specs) {
    return <Typography>No specifications available</Typography>;
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
            <ProductGeneralInfo/>
          </Grid>
        </Grid>
      </Paper>

      {/* Product Description Section */}
      <ProductDescription />

      {/* Specification Table */}
      <SpecificationTable />

      {/* Reviews Section */}
      <ReviewsSection />
    </Container>
  );
};

export default Product;