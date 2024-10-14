import express from "express";
import dotenv from "dotenv";
import database from "./config/database.js";
import Product from "./models/product.model.js";

dotenv.config();
database();

const app = express();

app.get("/", async (req, res) => {
  const product = await Product.find({});
  console.log(product);

  res.json(product);
});

app.listen(3000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
