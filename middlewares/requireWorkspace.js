module.exports = (req,res,next)=>{

    if(!req.session.workspaceId){
        req.session.toast = {
            type:"info",
            message:"Сначала выберите рабочее пространство"
        };


        return res.redirect("/dashboard");
    }


    next();

};