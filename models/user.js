const mongoose= require("mongoose");
const Schema= mongoose.Schema;
const UserSchema= new Schema({
    username:{
        require:true,
        type:String,
        unique:true
    },
    email:{
        require:true,
        type:String,
        unique:true
    },
    age:{
        require:true,
        type:Number,
    },
    password:{
        require:true,
        type:String,
    }

},{timestamps:true})

const UserModel=  mongoose.model("User", UserSchema)
module.exports= UserModel