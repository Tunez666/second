const wfModel = require("../models/wfModel");

const workspaceService = require("../services/workspaceService");

exports.showWorkspace = async (req, res) => {

    const workspace =
        await workspaceService.getWorkspace(
            req.session.userId,
            req.params.workspaceId
        );

    if (!workspace) {
        return res.status(404)
            .send("Пространство не найдено");
    }

    res.render("user/workspace", {
        workspace
    });

};

exports.selectWorkspace = async (req, res) => {

    const {
        workspaceId,
        redirect
    } = req.body;


    const userId = req.session.userId;


    const workspace =
        await wfModel.getWorkspaceById(
            workspaceId,
            userId
        );


    req.session.workspaceId = workspaceId;


    res.redirect(redirect || "/dashboard");

};