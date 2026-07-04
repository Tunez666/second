const express = require("express");
const path = require("path");
const session = require("express-session");
require('dotenv').config();
const logger = require("./utils/logger");
const { connectWithRetry } = require("./db/connect.js");

const indexRoutes = require("./routes/index");
const authRoutes = require("./routes/auth.js");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRoutes);
app.use("/", authRoutes);

connectWithRetry();

app.listen(3000, () => {
   logger.info("Server started http://localhost:3000");
});