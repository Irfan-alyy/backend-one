const passport = require("passport");
const { Strategy } = require("passport-github2");
const AuthUser = require("../models/Oauth_users");

passport.use(
  new Strategy(
    {
      clientID: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: "http://localhost:5000/auth/github/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // console.log(profile)
        const user = await AuthUser.findOne({ userId: profile.id ,provider:"github"});
        // console.log("user in db",user)
        if (!user) {
          const newUser = await AuthUser.create({
            userId: profile.id,
            email: profile.emails?.[0]?.value || "",
            name: profile.displayName,
            provider: profile?.provider || "github",
          });
          // console.log("new user created", newUser);
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
