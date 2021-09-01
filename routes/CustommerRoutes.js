const express=require('express')

const router=express.Router()
const Customer = require('../models/costommerModel')
const {validateCreateCustommer,validatePutCustommer,validateDeleteCustommer}=require('../validators/custommerValidator')
const { loginMiddleware } = require('../middleware/authMiddleware')


router.get('/api/me',loginMiddleware, async (req, res)=>{
    res.send(req.user)
})


router.get('/api/users',loginMiddleware, async (req, res) => {
    
    const custommers=await Customer.find()
    res.send(custommers)
})

router.get('/api/users/:id',loginMiddleware, async (req, res) => {
    const mongoose = require("mongoose");
    if(!mongoose.isValidObjectId(req.params.id))
        return res.status(400).send({message:"bad id"})
    id=req.params.id // => /api/users/1
    const user= await Customer.findById(id)
    res.send(user)
})

router.post('/api/users/',loginMiddleware, async (req, res)=>{
    // data validation
    // console.log(req.body)
    const {error}=validateCreateCustommer(req.body)
    if (error) return res.status(400).send({message:error.message})

    const user=new Customer({
        name:req.body.name,
    })
    const custommer=await user.save()
    res.send(custommer)
})

router.put('/api/users/:custommerId', loginMiddleware,async(req, res)=>{
    console.log(req.params.custommerId)
    const custommerId=req.params.custommerId
    const {error}=validatePutCustommer({name:req.body.name,custommerId})
    if (error) return res.status(400).send({message:error.message})
    const userIndex=await Customer.findById(custommerId)
    
    if (!userIndex) return res.status(404).send({message:"user not found"})
    userIndex.name=(req.body.name)
    userIndex.save()

    // if (!userIndex) return res.status(404).send({message:"user not found"})
    res.status(202).send(userIndex)
})

router.delete("/api/users/:custommerId",loginMiddleware,async(req,res)=>{
    const {error}=validateDeleteCustommer(req.params.xustommerId)
    if (error) return res.status(400).send({message:error.message})
    await Customer.findByIdAndRemove(req.params.custommer)
    res.status(200).send('deleted')
})

module.exports =router;