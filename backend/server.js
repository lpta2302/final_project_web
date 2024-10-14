import express from "express";
import dotenv from "dotenv";
import database from "./config/database.js";
import routesAdmin from "./routes/admin/index.route.js";

dotenv.config();
database();

const app = express();

routesAdmin(app);

app.listen(3000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
