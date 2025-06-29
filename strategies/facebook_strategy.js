const passport = require("passport");
const { Strategy } = require("passport-facebook");

const AuthUser = require("../models/Oauth_users");

passport.use(
  new Strategy(
    {
      clientID: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackUrl: "http://localhost:5000/auth/facebook/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = AuthUser.findOne({ userId: profile.id });
        if (!user) {
          const newUser = await AuthUser.create({
            userId: profile.id,
            email: profile.email,
            name: profile.name,
          });
          return done(null, newUser);
        }
        return done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

module.exports = passport;
