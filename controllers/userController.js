const userModel = require("../models/userModel");
const wfModel = require("../models/wfModel");
const taskModel = require("../models/taskModel");

exports.showDashboard =  async(req, res) => {
    const email = req.session.email;
    const id = req.session.userId;

    const user = await userModel.selectUserByEmail(email);

    const workspaces = await wfModel.allWorkspaces(id);

    const lastTasks = await taskModel.lastTasks(id);

    workspaces.forEach(ws => {
    ws.lastTask = lastTasks.find(task => task.id_ws === ws.id) || null;
});

    res.render("user/dashboard", { user, workspaces });

};
