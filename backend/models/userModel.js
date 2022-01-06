const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name."],
    maxlength: [30, "Name cannot exceed 30 characters"],
    minlength: [4, "Name cannot be less than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your password."],
    unique: true,
    validate: [validator.isEmail, "Please ented a valid email."],
  },
  password: {
    type: String,
    required: [true, "Please enter your password."],
    maxlength: [15, "Password cannot exceed 15 characters"],
    minlength: [8, "Password cannot be less than 8 characters"],
    select: false, // when info is retrieved, password value will not be given
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

//perform any operation before saving into db
userSchema.pre("save", async function (next) {
  // check in case of "Forgot password" functionality
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcryptjs.hash(this.password, 10);
});

// jwt token mechanism for user to login
userSchema.methods.getJWTToken = () => {
  // signing token based on id generated automatically in mongo
  // process.env.JWT_SECRET : secret key which should not be revealed publically
  // expiresIn : indicates after how long the token will be expired
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRE,
  });
};

userSchema.methods.passwordMatch = function (password) {
  return bcryptjs.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
