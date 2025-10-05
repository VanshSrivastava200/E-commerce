import mongoose from "mongoose";

export const connectDB= async () => {
    const MONGODB_URI='mongodb+srv://vanshsrivastava:vansh123@cluster0.awb3lcu.mongodb.net/userdetails'

    await mongoose.connect(MONGODB_URI).then(()=>{
        console.log('DB connected')
    })
}

const userSchema=new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    phoneNumber:{type:Number,required:true},
})

export const User=mongoose.model("User",userSchema)