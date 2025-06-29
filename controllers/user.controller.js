
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")
const JWT_SECRET= process.env.JWT_SECRET

const register = async (req, res) => {
  const { username, password, age, email } = req.body;
  // const data={username,password,age,email}
  try {
    const existingUser = await User.findOne({$or:[{username},{email}]});
    if (existingUser) {
      return res.status(409).json({ message: "Email or Username already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      age,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!"});
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user= await User.findOne({username})
    if(!user){
        return res.status(400).json({message:"Invalid Credentials"})
    }
    const isCorrect= await bcrypt.compare(password, user.password);
    if(!isCorrect) return res.status(400).json({message:"invalid credentials"})
    const token= jwt.sign({id:user.id}, JWT_SECRET)
    res.cookie("token",token, {
        secure:false,
        httpOnly:true,
        sameSite:"strict",
        maxAge:24*60*60*1000
    })
     res.status(200).json({message:"Login successfull"})   
  } catch (error) {
    console.log("Error occured while login", error)
    res.status(500).json({messsage:"Error occured"})
    
  }
};

module.exports = { login, register };
