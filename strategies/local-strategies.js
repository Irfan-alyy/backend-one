const passport = require("passport");
const { Strategy } = require("passport-local");
const User = require("../models/user");
const bcrypt = require("bcrypt");


module.exports = passport.use(
  new Strategy(async (username, password, done) => {
    console.log(`localStrategy,, Username: ${username}`);
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "No user found" });
      }
      const isCorrect = await bcrypt.compare(password, user.password);
      if (!isCorrect) {
        return done(null, false, { message: "Invalid credentials" });
      }
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  })
);
