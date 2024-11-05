import React from "react";
import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products, onProductClick }) => {
  return (
    <Grid container spacing={2} justifyContent="center">
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={3} key={product.id}>
          <ProductCard
            product={product}
            onClick={() => onProductClick(product)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductGrid;
