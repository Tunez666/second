const logger = require("../utils/logger");
const wfModel = require("../models/wfModel");

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