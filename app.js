const connectDb= require("./config/db")
const express= require("express");
const user= require("./routes/user")
const cookieParser= require("cookie-parser");
const morgan=require("morgan")
const session= require("express-session")
const errorHandler= require("./middlewares/errorHandler");
const passport= require("./config/passport")
const path= require("path")
connectDb();


const app= express()

app.use(session({
    secret:"irfan",
    resave:false,
    saveUninitialized:false,
    cookie:{
        secure:false,
        httpOnly: true,
        maxAge: 1000  * 60 * 60
    }
}))

app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session())
app.use(express.json())
app.use(morgan("dev"))
app.use(errorHandler)
app.use("/",user)

module.exports= app