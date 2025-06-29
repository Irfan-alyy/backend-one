const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");
const AuthUser = require("../models/Oauth_users");


const googleStrategy = passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const findUser = await AuthUser.findOne({ userId: profile.id , provider: "google" });
        // console.log("user in db", findUser);
        if (!findUser) {
          const newUser = await AuthUser.create({
            name: profile._json.name,
            userId: profile.id,
            email: profile._json.email,
            provider: profile.provider || "google",
          });
          // console.log("new user", newUser);
          return done(null, newUser);
        }
        done(null, findUser);
      } catch (error) {
        done(error, null);
      }
    }
  )
);


module.exports = googleStrategy;
