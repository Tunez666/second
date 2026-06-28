const express = require("express");
const path = require("path");
const session = require("express-session");
require('dotenv').config();
const db = require("./db/connect.js");

const indexRoutes = require("./routes/index");
const authRoutes = require("./routes/auth");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRoutes);
app.use("/", authRoutes);

app.listen(8080, () => {
    console.log("Server started http://localhost:8080");
});