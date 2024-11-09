import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import routesAdmin from "./routes/admin/index.route.js";

import routesClient from "./routes/client/index.js";

import dotenv from "dotenv";
import database from "./config/database.js";

// App config
const app = express();
const port = process.env.PORT || 4000;

// MiddleWare
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));
app.use((req, res, next) => {
  res.cookie("__vercel_live_token", "value", {
    httpOnly: true, // recommended for security
    secure: true, // ensures cookie is sent over HTTPS
    sameSite: "None", // allows the cookie to be sent in cross-origin requests
    maxAge: 24 * 60 * 60 * 1000, // expires in 1 day, adjust as needed
  });
  next();
});

// Dotenv
dotenv.config();
// End dotenv

// Database
database();
// End database

// Routes
routesAdmin(app);
routesClient(app);

// Start Server
app.listen(port, () => {
  console.log("Server is running at port: " + port);
});
