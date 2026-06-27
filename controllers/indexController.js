exports.showHome =  (req, res) => {

    res.render("index");

};

exports.showRegistration = (req, res) => {
    res.render("auth/registration");
};

exports.showLogin = (req, res) => {
    res.render("auth/login");
};