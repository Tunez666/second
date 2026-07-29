const userModel = require("../models/userModel");
const wfModel = require("../models/wfModel");
const taskModel = require("../models/taskModel");

const { formatTaskStatus } = require("../utils/taskFormatter");
const { formatDate } = require("../utils/dateFormatter");

exports.getDashboard = async (email, userId) => {

    const user = await userModel.selectUserByEmail(email);

    const workspaces = await wfModel.allWorkspaces(userId);

    const activeTasks = await taskModel.activeTasks(userId);

    workspaces.forEach(ws => {

        ws.activeTasks = activeTasks
            .filter(task => task.id_ws === ws.id)
            .slice(0, 3)
            .map(task => ({

                ...task,

                status: formatTaskStatus(task.status),

                date: formatDate(task.updated_at)

            }));

    });

    return {
        user,
        workspaces
    };

}