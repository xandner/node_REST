const Joi=require("joi");
Joi.objectId = require('joi-objectid')(Joi);


const validateCreateCustommer=(data)=>{
    const schema=Joi.object({
        name:Joi.string().min(2).max(20).required()
    })
    return schema.validate(data)
}

const validatePutCustommer=(data) => {
    const schema=Joi.object({
        name:Joi.string().min(2).max(20).required(),
        custommerId:Joi.objectId().required()
    })
    return schema.validate(data)
}
const validateDeleteCustommer=(data) => {
    const schema=Joi.object({
        custommerId:Joi.objectId().required()
    })
    return schema.validate(data)
}

module.exports={
    validateCreateCustommer,
    validatePutCustommer,
    validateDeleteCustommer
}