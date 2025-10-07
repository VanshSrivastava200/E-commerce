import express from 'express'
import { connectDB,User,Product } from './db.js'
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

app.post("/add-product", async (req, res) => {
  try {
    const { name, description, price, category, stock, images } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required" });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
      images
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);  // <-- this will log the real error
    res.status(500).json({ message: "Server error" });
  }
});

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

app.get('/home', async (req, res) => {
  const search = req.query.search;

  const query = search
    ? {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { category: { $elemMatch: { $regex: search, $options: "i" } } },
        ],
      }
    : {};

  try {
    const products = await Product.find(query).limit(50); // optional limit
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});



app.listen(port,()=>{
    console.log(`Server running at http://localhost:${port}`)
})