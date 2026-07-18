const express = require("express");
const path = require("path");
const session = require("express-session");
require('dotenv').config();
const logger = require("./utils/logger");
const { connectWithRetry } = require("./db/connect.js");

const indexRoutes = require("./routes/index");
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user.js");
const modalsRoutes = require("./routes/modals.js");
const workspaceRoutes = require("./routes/workspace.js");

const toastMiddleware = require("./middlewares/toastMiddleware");
const currentWs = require("./middlewares/currentWs");


const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "supersecretkey",  // секретная фраза для подписи куки
    resave: false,              // не сохранять, если сессия не изменена
    saveUninitialized: false,   // не сохранять пустые сессии
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 день
}));

app.use((req, res, next) => {
    res.locals.user = req.session.userId ? {
        id: req.session.userId,
        username: req.session.username,
    } : null;

    next();
});

app.use(toastMiddleware);
app.use(currentWs);


app.use("/", indexRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", modalsRoutes);
app.use("/", workspaceRoutes);

connectWithRetry();

app.listen(3000, () => {
   logger.info("Server started http://localhost:3000");
});