const express = require("express");
const router = express.Router();
const logger = require("../utils/logger");

const workspaceController = require("../controllers/workspaceController");
const authMiddleware = require("../middlewares/auth");

logger.info("workspace routes loaded");


router.get(
    "/workspace/:workspaceId",
    authMiddleware.isAuth,
    workspaceController.showWorkspace
);

router.post( "/workspace/select", authMiddleware.isAuth, workspaceController.selectWorkspace);

module.exports = router;