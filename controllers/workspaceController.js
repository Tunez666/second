const wfModel = require("../models/wfModel");


exports.showWorkspace = async(req,res)=>{

    const userId = req.session.userId;

    const workspaceId = req.params.workspaceId;


    const workspace = await wfModel.getWorkspaceById(
        workspaceId,
        userId
    );


    if(!workspace){

        return res.status(404)
        .send("Пространство не найдено");

    }


    res.render(
        "user/workspace",
        {
            workspace
        }
    );

};

exports.selectWorkspace = async (req, res) => {

    const { workspaceId } = req.body;
    const userId = req.session.userId;

    const workspace = await wfModel.getWorkspaceById(workspaceId, userId);

    if (!workspace) {
        return res.redirect("/dashboard");
    }

    req.session.workspaceId = workspaceId;

    res.redirect("/dashboard");
};