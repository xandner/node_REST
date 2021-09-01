const Joi=require("joi");

const validation=(data)=>{
    const schema=Joi.object({
        name:Joi.string().min(2).max(30).required(),
    })
    const message=schema.validate(data)
    return message
}
const validationInput=(data)=>{
    const schema=Joi.object({
        name:Joi.string().min(2).max(30).required(),
        id:Joi.number().required()
    })
    const message=schema.validate(data)
    return message
}
module.exports ={validation,validationInput};