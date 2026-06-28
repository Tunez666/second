const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

console.log("auth routes loaded");

router.get("/register", authController.showRegistration);

router.get("/login", authController.showLogin);

router.post("/reg", authController.registration);

module.exports = router;