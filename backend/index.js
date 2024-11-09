import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import routesAdmin from "./routes/admin/index.route.js";

import routesClient from "./routes/client/index.js";

import dotenv, { parse } from "dotenv";
import database from "./config/database.js";

// App config
const app = express();
const port = process.env.PORT || 4000;

// MiddleWare
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));

app.use((req, res, next) => {
  const secureCookie = req.protocol === "https"; // Crucial for Vercel

  res.cookie("__vercel_live_token", "value", {
    httpOnly: true,
    secure: true, // Set based on protocol
    sameSite: "lax", // Dynamic SameSite
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
