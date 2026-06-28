const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.showRegistration = (req, res) => {
    res.render("auth/registration");
};

exports.showLogin = (req, res) => {
    res.render("auth/login");
};

exports.registration =  async(req, res) => {

    const {name, email, pass, repPass} = req.body;
    
    if(pass != repPass){
        return res.send("Пароли не совпадают");
        }

    if(pass.length < 8){
       return res.send("Пароль должен содержать минимум 8 символов");
        }

    const dificcult = 10;
    const hashedPass = await bcrypt.hash(pass, dificcult);

    await userModel.registration({
        name,
        email,
        password: hashedPass
    });
    res.redirect("login");


};