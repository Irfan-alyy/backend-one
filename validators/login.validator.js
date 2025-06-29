const {checkSchema}= require("express-validator")

const loginValidation=checkSchema({
username: {
    trim: true,
    escape: true,
    notEmpty: {
      errorMessage: "User name Should not be empty",
    }
  },
  password:{
    trim: true,
    escape: true,
    notEmpty: {
      errorMessage: "User name Should not be empty",
    }
  }
})

module.exports= loginValidation
