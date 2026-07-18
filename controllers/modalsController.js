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

exports.createTask = async(req,res)=>{

    try{

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

            type:"success",
            message:"Задача создана!"

        };


        res.redirect(`/workspace/${workspaceId}/tasks`);


    }catch(err){

        logger.error(err);


        req.session.toast = {

            type:"error",
            message:"Не удалось создать задачу"

        };


        res.redirect("/dashboard");

    }

};