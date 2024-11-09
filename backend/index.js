import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import routesAdmin from "./routes/admin/index.route.js";
import expressSession from 'express-session'; 
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

Object.defineProperty(expressSession.Cookie.prototype, 'sameSite', {
  // sameSite cannot be set to `None` if cookie is not marked secure
  get() {
    return this._sameSite === 'none' && !this.secure ? 'lax' : this._sameSite;
  },
  set(value) {
    this._sameSite = value;
  }
});

app.use(expressSession({
  secret: 'your_secret_key', // Set your secret key
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: 'auto', // Automatically set secure based on connection
    sameSite: 'none' // Use None if secure; falls back to Lax if not secure
  }
}));

app.use((req, res, next) => {
  const isHttps = req.protocol === "https"; // Check if the protocol is HTTPS
  const secureCookie = isHttps ? true : false; // Set secure flag based on protocol
  const sameSiteValue = secureCookie ? "None" : "Lax"; // Dynamic SameSite value
  
  // Fetch or generate token (use a session value or any dynamic value you prefer)
  const liveToken = req.session ? req.session.liveToken : "default_token_value"; 

  res.cookie("__vercel_live_token", liveToken, {
    httpOnly: true,
    secure: secureCookie, // Only set secure flag if HTTPS
    sameSite: sameSiteValue, // Use dynamic SameSite value
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
