const wfModel = require("../models/wfModel");

exports.getWorkspace = async (userId, workspaceId) => {

    const workspace =
        await wfModel.getWorkspaceById(
            workspaceId,
            userId
        );

    if (!workspace) {
        return null;
    }

    return workspace;

};