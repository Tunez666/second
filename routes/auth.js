const express = require("express");
const router = express.Router();
const logger = require("../utils/logger");
const authController = require("../controllers/authController");

logger.info("auth routes loaded");

router.get("/register", authController.showRegistration);

router.get("/login", authController.showLogin);

router.post("/reg", authController.registration);

module.exports = router;