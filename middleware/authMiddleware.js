const jwt=require('jsonwebtoken')
const config=require('config');

const loginMiddleware=(req,res,next)=>{
    const token=req.header("x-auth-token");
    if (!token) return res.status(401).send({message:"invalid token"});
    try{

        const user=jwt.verify(token,config.get("iwtPrivateKye"))
        req.user=user
    }catch(ex){
        return res.status(401).send({message:"invalid data"});
    }

    next()
}

module.exports={
    loginMiddleware
}