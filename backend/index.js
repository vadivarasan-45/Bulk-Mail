const express=require("express")
const cors=require("cors")
const mailer=require("nodemailer")
const mongoose=require("mongoose")
const add=express()
add.use(cors())
add.use(express.json())
add.listen("2000",function(){
    console.log("the server was start sucessfully....")
})
mongoose.connect("mongodb+srv://vasagiri2:vadivarasan@cluster0.hlc1izq.mongodb.net/mail?retryWrites=true&w=majority&appName=Cluster0").then(function(){console.log("The Server has been started...")}).catch(function(){console.log("The Server was failed to start...")})

const roll=mongoose.model("title",{},"shell")
add.post("/email",function(req,res){
    const value=req.body.msg
    const total=req.body.total
    console.log(total)
roll.find().then(function(iteam){
    const transpot=mailer.createTransport({
        service:"gmail",
        auth: {
            user:iteam[0].toJSON().user,
            pass:iteam[0].toJSON().pass,
        }
    })
     new Promise(
        async function(resolve,reject)
        {
         try{
        for (var i=0;i<total.length;i++){
          await transpot.sendMail({
                from:"vasagiri2@gmail.com",
                to:total[i],
                subject:"we are Hrining",
                text:value,
            },
            )
            console.log(total[i])
        }
            resolve("the email was send")
    }
    catch(error){
        console.log(error)
        reject("the email was fail to send")
    }
        }).then(function(){
        res.send(true)
    }).catch(function(){
        res.send(false)
    })
}).catch(function(error)
  {
    console.log(error)
})})