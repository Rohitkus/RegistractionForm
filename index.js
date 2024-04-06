const express = require('express');
const create=require("./model/regstraction")
const mongo =  require('mongoose');
const bodyparcer=require('body-parser')
const dotenv =require("dotenv")
const alert = require('alert')

dotenv.config();

mongo.connect (process.env.MONGO).then(()=>{
    console.log("connected to databese!");
}).catch((err)=>{
    console.log(err)
});
const app = express();
const path= require('path')
app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,'public')))

app.use(bodyparcer.urlencoded({
    extended:true
}))

app.get('/',(req,res)=>{
    res.render("index")
})
app.get('/success',(req,res)=>{
    res.render("success")
})

app.post('/create',async(req,res)=>{
   const {Fname,Lname,Email ,Password}= req.body;
   existUser= create.findOne({Email})
   if(!existUser){
       let data= new create({
        Fname,
        Lname,
        Email,
        Password
       })
        await data.save();

        res.redirect("/success")
   }
   else{
 console.log("Email Already Registered");
    res.redirect("/")
   }
  


})


app.listen(4500,()=>{console.log("server is running on the port no 4500")})