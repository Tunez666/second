const express = require("express");
const router = express.Router();
const logger = require("../utils/logger");
const authController = require("../controllers/authController");

logger.info("auth routes loaded");

//GET
router.get("/register", authController.showRegistration);
router.get("/login", authController.showLogin);

//POST
router.post("/reg", authController.registration);
router.post("/login", authController.login);

module.exports = router;