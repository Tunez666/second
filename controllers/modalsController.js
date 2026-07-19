const logger = require("../utils/logger");
const wfModel = require("../models/wfModel");
const taskModel = require("../models/taskModel");

exports.createWs = async (req, res) => {

    try {
        const { name, description } = req.body;
        const userId = req.session.userId;

        await wfModel.createWf({
            name,
            description,
            id_user: userId
        });

        req.session.toast = {
            type: "success",
            message: "Пространство создано!"
        };

    } catch (err) {
        logger.error(err);
        req.session.toast = {
            type: "error",
            message: "Не удалось создать пространство. Попробуйте ещё раз."
        };
    }
    res.redirect("/dashboard");

};

exports.createTask = async (req, res) => {

    try {

        const {
            title,
            description,
            start_date,
            due_date,
            all_day
        } = req.body;


        const workspaceId = req.session.workspaceId;


        await taskModel.createTask({

            id_ws: workspaceId,
            title,
            description,
            start_date,
            due_date,
            all_day

        });


        req.session.toast = {

            type: "success",
            message: "Задача создана!"

        };


        res.redirect(`/tasks`);


    } catch (err) {

        logger.error(err);


        req.session.toast = {

            type: "error",
            message: "Не удалось создать задачу"

        };


        res.redirect("/dashboard");

    }

};

exports.updateTask = async (req, res) => {

    try {

        const userId = req.session.userId;

        const taskId = req.params.id;


        const task = await taskModel.getTaskById(
            taskId,
            userId
        );


        if (!task) {

            req.session.toast = {
                type: "error",
                message: "Задача не найдена"
            };

        }


        await taskModel.updateTask(
            taskId,
            req.body
        );

        req.session.toast = {

            type: "success",
            message: "Задача обновлена"

        };

        res.json({
            success: true,
            message: "Задача обновлена"
        });


    } catch (err) {

        console.error(err);

        req.session.toast = {
            type: "error",
            message: "Ошибка обновления задачи"
        };

    }

};

exports.deleteTask = async (req, res)=>{

    try {

        const userId = req.session.userId;

        const taskId = req.params.id;


        const task = await taskModel.getTaskById(
            taskId,
            userId
        );


        if(!task){

            return res.status(404).json({
                message:"Задача не найдена"
            });

        }


        await taskModel.deleteTask(taskId);


        req.session.toast = {

            type:"success",
            message:"Задача удалена"

        };


        res.json({
            success:true
        });


    } catch(err){

        console.error(err);

        res.status(500).json({
            message:"Ошибка удаления задачи"
        });

    }

};