import express from "express";
import cors from "cors";
import "dotenv/config";
import bodyParser from "body-parser";
import morgan from "morgan";
import connectDB from "./config/mongodb.js";
import routesAdmin from "./routes/admin/index.route.js";

// App config
const app = express();
const port = process.env.PORT || 4000;

// MiddleWare
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));

// Routes
routesAdmin(app);

// Start Server
app.listen(port, () => {
  console.log("Server is running at port: " + port);
  connectDB();
});



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

app.listen(4000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
