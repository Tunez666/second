const express = require("express");
const router = express.Router();
const logger = require("../utils/logger");

const authMiddleware = require("../middlewares/auth");
const modalsController = require("../controllers/modalsController");

logger.info("modals routes loaded");

router.post("/createWs", authMiddleware.isAuth, modalsController.createWs);

module.exports = router;