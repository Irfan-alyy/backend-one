const mongoose= require("mongoose");
const Schema= mongoose.Schema;

const OauthSchema= new Schema({
    name:{
        type:String,
        require: true,
    },
    userId:{
        type:String,
        require: true,
        unique: true
    },
    email:{
        type:String,
        require: true,
    },
    provider:
    {
        type:String,
        require: true,
    }

},{timestamps:true})

const OauthModel= mongoose.model("AuthUser",OauthSchema);
module.exports= OauthModel