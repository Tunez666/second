const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");

console.log("index routes loaded");

router.get("/", indexController.showHome);

router.get("/register", indexController.showRegistration);

router.get("/login", indexController.showLogin);

module.exports = router;