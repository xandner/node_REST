const express=require('express');
const router=express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const config = require('config');

const UserModel=require('../models/userModel')
const{loginValidator,registerValidator}=require('../validators/UserValidator');

router.post("/api/login",async (req,res)=>{
    const {error}=loginValidator(req.body)
    if (error) return res.status(400).send(error.message)
    const user=await UserModel.findOne({phone:req.body.phone})
    if (!user) return res.status(404).send({message: 'User not found'})
    const userChecked = await bcrypt.compare(req.body.password,user.password)
    if (!userChecked) return res.status(400).send({message: 'password is incorrect'})
    const data={
        _id: user.id,
        name: user.name,
        role: user.role,
    }
    const token=jwt.sign(data,config.get("iwtPrivateKye"))
    res.status(200).send({message:token})
})

router.post("/api/register",async (req,res)=>{
    const {error}=registerValidator(req.body)
    if (error) return res.status(404).send(error.message)
    const user = await UserModel.findOne({phone:req.body.phone})
    if (user) return res.status(400).send("phone exists")
    // const newUser = new UserModel({
    //     name: req.body.name,
    //     phone: req.body.phone,
    //     password: req.body.password,
    //     }
    // )
    
    const newUser = new UserModel(_.pick(req.body,["name","phone","password","role"]))
    const salt=await bcrypt.genSaltSync(10)
    const pass=await bcrypt.hash(req.body.password, salt)
    newUser.password=pass
    await newUser.save()
    res.status(201).send(_.pick(newUser,["name","phone"]))
    
})

module.exports=router