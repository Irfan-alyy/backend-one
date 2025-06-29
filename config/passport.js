const passport= require("passport");
const User= require("../models/user");
const AuthUser= require("../models/Oauth_users");
require("../strategies/google-strategy");
require("../strategies/local-strategies");

passport.serializeUser((user,done)=>{
    done(null, user._id)
});

passport.deserializeUser(async (id,done)=>{
    try {
        
        let user= await User.findById(id);
        if(!user){
            user= await AuthUser.findById(id);
        }
        if(!user) return done(new Error("User not Found", null));
        done(null, user);
    } catch (error) {
       done(error, null) 
    }
})

module.exports= passport