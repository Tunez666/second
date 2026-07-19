const userModel = require("../models/userModel");
const wfModel = require("../models/wfModel");
const taskModel = require("../models/taskModel");

const { formatTaskStatus } = require("../utils/taskFormatter");
const { formatDate } = require("../utils/dateFormatter");

exports.showDashboard = async (req, res) => {
    const email = req.session.email;
    const id = req.session.userId;

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
    res.render("user/dashboard", { user, workspaces });
};

exports.showTasks = async (req, res) => {

    try {


        const userId = req.session.userId;

        const workspaceId = req.session.workspaceId;



        if (!workspaceId) {

            return res.redirect("/dashboard");

        }



        const workspaces =
            await wfModel.allWorkspaces(userId);



        const workspace =
            await wfModel.getWorkspaceById(
                workspaceId,
                userId
            );



        if (!workspace) {

            return res.status(404)
                .send("Пространство не найдено");

        }



        const tasks =
            await taskModel.tasksFromWs(
                workspaceId
            );



        const formattedTasks =
            tasks.map(task => ({


                ...task,


                start_date_formatted:
                    formatDate(task.start_date),


                due_date_formatted:
                    formatDate(task.due_date),


                status_formatted:
                    formatTaskStatus(task.status)


            }));



        res.render(
            "user/tasks",
            {

                workspaces,

                workspace,

                tasks: formattedTasks,

                workspaceId

            }
        );



    } catch (err) {


        console.error(err);


        res.status(500)
            .send("Ошибка загрузки задач");


    }

};

//отображение конкретной задачи по id на станице тасков
exports.getTask = async (req, res) => {


    const userId = req.session.userId;

    const taskId = req.params.id;


    const task = await taskModel.getTaskById(
        taskId,
        userId
    );


    if (!task) {

        return res.status(404).json({
            message: "Задача не найдена"
        });

    }


    res.json(task);

};