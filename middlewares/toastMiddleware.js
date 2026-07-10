module.exports = (req, res, next) => {
    res.locals.toast = req.session.toast || null;

    delete req.session.toast;

    next();
};

