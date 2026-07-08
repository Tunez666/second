const express = require("express");
const router = express.Router();
const logger = require("../utils/logger");
const authMiddleware = require("../middlewares/auth");
const userController = require("../controllers/userController");

logger.info("user routes loaded");

//GET
router.get("/dashboard", authMiddleware.isAuth, userController.showDashboard);


module.exports = router;