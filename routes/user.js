const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/user.controller");
const registrationValidation = require("../validators/register.validator");
const loginValidation = require("../validators/login.validator");
const validate = require("../middlewares/validate");
require("../strategies/local-strategies");
require("../strategies/google-strategy")// google strategy for OAuth
require("../strategies/github_strategy");// github strategy for OAuth
require("../strategies/facebook_strategy")// facebook strategy for OAuth
const jwt= require("jsonwebtoken")
const passport = require("passport");
const e = require("express");
const JWT_SECRET=process.env.JWT_SECRET

router.post("/login", loginValidation, validate, login);
router.post("/register", registrationValidation, validate, register);


router.get("/auth", (req,res)=>{
  
})

// login using passport authentication
router.post("/auth/login", loginValidation, validate, (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user)
      return res
        .status(401)
        .json({
          success: false,
          message: info?.message || "Invalide credentials",
        });
    const token= jwt.sign({id:user._id, username:user.username}, JWT_SECRET, {expiresIn:"1h"})
    res.cookie("token",token, {
        secure:false,
        httpOnly:true,
        sameSite:"strict",
        maxAge: 24*60*60*1000
    })
    return res
      .status(200)
      .json({ message: "logged in successfull"});
  })(req, res, next);
});
router.get("/test",(req,res)=>{
    const token= req.cookies?.token
    jwt.verify(token,JWT_SECRET, (err,decoded)=>{
        if(err) return res.status(403).json({message:"Invalid Token"})
        res.json(decoded)
    })
})


//login using passport js authentication
router.post("/auth/plogin", passport.authenticate("local"), (req,res)=>{
  res.sendStatus(200);
})

router.get("/auth/status", (req,res)=>{
  console.log(req.session);
  req.sessionStore.get(req.session.id, (err, sessionData)=>{
    if(err){
      console.log(err);
      throw err; 
    }
    console.log("Inside session store");
    console.log(sessionData);
  })
  res.sendStatus(200)
})


//Google OAuth routes

router.get("/auth/google", passport.authenticate('google' ,{ scope: ['profile',"email"] }))

router.get("/auth/google/redirect", passport.authenticate('google', {failureRedirect: "/auth/login"}), (req,res)=>{
  console.log("login with google succeefull");
  res.redirect("/");

})

//Github Oauth Routes

router.get("/auth/github", passport.authenticate('github'))

router.get("/auth/github/redirect", passport.authenticate('github', {failureRedirect: "/auth/login"}), (req,res)=>{
  console.log("login with github succeefull");
  res.redirect("/");

})

// Faebook Oauth routes

router.get("/auth/facebook", passport.authenticate('facebook'))

router.get("/auth/facebook/redirect", passport.authenticate('facebook', {failureRedirect: "/auth/login"}), (req,res)=>{
  console.log("login with facebook succeefull");
  res.redirect("/");

})

module.exports = router;
