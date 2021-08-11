async function isAuthenticate(req,res,next){
    if(req.session.credentials){
        next();
    }
    else{
        res.redirect("/login");
    }
}


module.exports = isAuthenticate;