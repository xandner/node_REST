const jwt=require('jsonwebtoken')
const config=require('config');

const adminMiddleware=(req,res,next)=>{
    if (req.user.role!=='admin') return res.status(401).send({message:"you are not admin"})
    next()
}

module.exports={
    adminMiddleware
}