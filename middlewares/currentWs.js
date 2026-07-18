module.exports = (req,res,next)=>{

    res.locals.currentWorkspace = 
        req.session.workspaceId || null;


    res.locals.workspaceId =
        req.session.workspaceId || null;

    res.locals.currentPath = req.originalUrl;


    next();

};