const express = require("express");
const router = express.Router();
const logger = require("../utils/logger");
const authMiddleware = require("../middlewares/auth");
const userController = require("../controllers/userController");
const workspaceController = require("../controllers/workspaceController");

logger.info("user routes loaded");

//GET
router.get("/dashboard", authMiddleware.isAuth, userController.showDashboard);

router.get("/workspace/:workspaceId/tasks", authMiddleware.isAuth, userController.showTasks);

//POST



module.exports = router;