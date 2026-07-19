const express = require("express");
const router = express.Router();
const logger = require("../utils/logger");

const authMiddleware = require("../middlewares/auth");
const modalsController = require("../controllers/modalsController");

logger.info("modals routes loaded");

router.post("/createWs", authMiddleware.isAuth, modalsController.createWs);

router.post("/workspace/:workspaceId/tasks", authMiddleware.isAuth, modalsController.createTask);

router.put("/tasks/:id", authMiddleware.isAuth, modalsController.updateTask);

router.delete("/tasks/:id", authMiddleware.isAuth, modalsController.deleteTask);


module.exports = router;