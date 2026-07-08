const logger = require("../utils/logger");
module.exports = {
    isAuth: (req, res, next) => {
        if (req.session.userId) {
            next(); 
        } else {
            req.session.toast = {
            type:"error",
            message:"Сессия истекла, пожалуйста, авторизуйтесь снова!"
};
            res.redirect("/login"); 
        }
    }
};