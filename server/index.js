import express from 'express'
import { connectDB,User } from './db.js'
import cors from 'cors'
const app=express()
const port=3000

await connectDB();

app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send("server started")
})

app.post('/signup',async (req,res)=>{
  const {firstName,lastName,email,password,phoneNumber}=req.body
  const newUser= new User({
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
  })
  await newUser.save()
  console.log(newUser)
  res.send("New User added")
})

app.post('/login',async(req,res)=>{
    const {email,password}=req.body
    await User.findOne({email:email}).then(
        user=>{
            if(user){
                if(user.password==password){
                    res.json("Success")
                }
                else[
                    res.json("Incorrect Password")
                ]
            }
            else{
                res.json("User does not exist")
            }
        }
    )
})

app.post('/home',async (req,res)=>{
    const {email}=req.body
    const user = await User.findOne({email}).select("-password")
    if(user){
        res.json(user)
        console.log(user)
    }
    else{
        console.log("no user found")
    }
})

app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`)
})