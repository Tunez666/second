const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const logger = require("../utils/logger");

exports.showRegistration = (req, res) => {
    res.render("auth/registration");
};

exports.showLogin = (req, res) => {
    res.render("auth/login");
};

exports.registration =  async(req, res) => {

    const {username, email, pass, repPass} = req.body;
    
    if(pass !== repPass){ 
    req.session.toast = {
    type:"error",
    message:"Пароли не совпадают!"
};
    return res.redirect("register");
        }

    if(pass.length < 8){
       req.session.toast = {
        type:"error",
        message:"Пароль должен содержать минимум 8 символов!"
};
    return res.redirect("register");
        }

    const dificcult = 10;
    const hashedPass = await bcrypt.hash(pass, dificcult);

    await userModel.registration({
        username,
        email,
        password: hashedPass
    });

    req.session.toast = {

    type:"success",

    message:"Регистрация прошла успешно!"

};

    res.redirect("login");


};

exports.login = async(req, res) => {
    const {email, password} = req.body;

    const user = await userModel.selectUserByEmail(email);

    if (!user) {
         req.session.toast = {
        type:"error",
        message:"Пользователь не найден!"
};
    return res.redirect("login");
    }

    const match = await bcrypt.compare(password, user.password);

     if (!match) {
         req.session.toast = {
            type:"error",
            message:"Неверный пароль!"
        };
        return res.redirect("login");
    }
    
    req.session.userId = user.id;
    req.session.username = user.username;

    req.session.toast = {
    type:"success",
    message:"Вход выполнен успешно!"
};

    res.redirect("/dashboard");


};