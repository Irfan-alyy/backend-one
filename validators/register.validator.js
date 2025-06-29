const { checkSchema } = require("express-validator");

const registrationValidation = checkSchema({
  username: {
    trim: true,
    escape: true,
    notEmpty: {
      errorMessage: "User name Should not be empty",
    },
    isAlphanumeric: {
      errorMessage: "User name must only contain alphabets and numbers only",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "Password Should not be empty",
    },
    isLength: {
      options: { min: 8 },
      errorMessage: "Password length should be minimum 8",
    },
    matches: {
      options: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$#@&%])/,
      errorMessage:
        "Password must contain atleast one symbol, one uppercase and one lowercasr latter",
    },
  },
  email: {
    notEmpty: {
      errorMessage: "Email is Required",
    },
    isEmail: {
      errorMessage: "Invalid Email, should be a valid email",
    },
  },
  age: {
    trim:true,
    notEmpty: {
      errorMessage: "Age is Required",
    },
    
    isInt:{
        errorMessage:"Age should be in numbers"
    }
  },
});

module.exports = registrationValidation

