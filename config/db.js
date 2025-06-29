
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


const connectDb=async()=>{
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log("Mongo Database Connected successfully")
    } catch (error) {
        console.log("Mongo connection", error.message);
        process.exit(1)
        
    }
}

module.exports= connectDb
