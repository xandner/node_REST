// const { query } = require('express');
const express =require ('express')
const morgan=require('morgan')
const mongoose= require('mongoose');
const {myMiddalware}= require('./middalware')
const custommerRoutes= require ('./routes/CustommerRoutes')
const userRoutes= require('./routes/userRoutes')

// console.log(config.get("databaseAddress"));


// const {validation} = require('./data_validation')

const app=express();



app.use(express.json())
app.use(myMiddalware)
app.use(express.urlencoded({ extended:true }))
app.use(express.static("public"))
app.use(custommerRoutes)
app.use(userRoutes)
if (app.get("env")==="development")
app.use(morgan('tiny'))

app.get('/', (req, res) => {
     res.send("Hi")
})


mongoose.connect("mongodb://localhost:27017/custommer",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("database connected")
}).catch(err => console.log(err))

const port=process.env.PORT || 3000
app.listen(port,(err) => {
    if (err) console.error(err)
    else console.log(`app is listenning on port ${port}`)
})