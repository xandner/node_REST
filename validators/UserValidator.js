const Joi=require("joi");
Joi.objectId = require('joi-objectid')(Joi);

const loginValidator=(data)=>{
    const schema=Joi.object({
        phone:Joi.string().required(),
        password:Joi.string().required(),
    })
    return schema.validate(data)
}
const registerValidator=(data)=>{
    const schema=Joi.object({
        phone:Joi.string().required(),
        password:Joi.string().required().min(5),
        name:Joi.string().required(),
        role:Joi.string(),

        //name:Joi.string().min(2).max(20).required()

    })
    return schema.validate(data)
}

module.exports={
    loginValidator,
    registerValidator
}