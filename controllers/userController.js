const userModel = require("../models/userModel");
const wfModel = require("../models/wfModel");
const taskModel = require("../models/taskModel");

const { formatTaskStatus } = require("../utils/taskFormatter");
const { formatDate } = require("../utils/dateFormatter");

exports.showDashboard = async (req, res) => {
    const email = req.session.email;
    const id = req.session.userId;
    const workspaceId = req.params.workspaceId;

    const user = await userModel.selectUserByEmail(email);

    const workspaces = await wfModel.allWorkspaces(id);

    const activeTasks = await taskModel.activeTasks(id);


    workspaces.forEach(ws => {

        ws.activeTasks = activeTasks
            .filter(task => task.id_ws === ws.id)
            .slice(0, 3)
            .map(task => ({

                ...task,

                status:
                    formatTaskStatus(task.status),

                date:
                    formatDate(task.updated_at)

            }));

    });
    res.render("user/dashboard", { user, workspaces, workspaceId });
};

exports.showTasks = async (req, res) => {

    try {

        const userId = req.session.userId;
        const workspaceId = req.params.workspaceId;

        const workspaces = await wfModel.allWorkspaces(userId);

        const workspace = await wfModel.getWorkspaceById(
            workspaceId,
            userId
        );


        if (!workspace) {

            return res.status(404)
                .send("Пространство не найдено");

        }


        const tasks = await taskModel.tasksFromWs(
            workspaceId
        );


        res.render(
            "user/tasks",
            {
                workspaces,
                workspace,
                tasks,
                workspaceId
            }
        );


    } catch (err) {

        console.error(err);

        res.status(500)
            .send("Ошибка загрузки задач");

    }

};


