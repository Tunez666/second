module.exports = (req, res, next) => {

    res.locals.currentWorkspace =
        req.session.workspaceId || null;

    next();

};