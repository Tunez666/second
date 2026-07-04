const express = require("express");
const router = express.Router();
const logger = require("../utils/logger");
const indexController = require("../controllers/indexController");

logger.line();

logger.startup(`
╦  ┬┌─┐┌─┐╔╦╗┬─┐┌─┐┌─┐
║  │├┤ ├┤  ║ ├┬┘├┤ ├┤ 
╩═╝┴└  └─┘ ╩ ┴└─└─┘└─┘
`);

logger.line();

logger.info("index routes loaded");

router.get("/", indexController.showHome);

module.exports = router;