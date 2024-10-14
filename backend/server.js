import express from "express";
import dotenv from "dotenv";
import database from "./config/database.js";
import routesAdmin from "./routes/admin/index.route.js";
import bodyParser from "body-parser";

// Dotenv
dotenv.config();
// End dotenv

// Database
database();
// End database

const app = express();

// parse application/json
app.use(bodyParser.json()); // Di chuyển cấu hình body-parser lên đây

// Routeradmin
routesAdmin(app);
// End routeradmin

app.listen(3000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
