const userSchema = require("../models/userModel");
const Errorhandler = require("../utils/errorhandler");
const handleAsyncError = require("../middleware/handleAsyncError");
const Apifeatures = require("../features/apifeatures");

// register a user to system

exports.registerUser = handleAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await userSchema.create({
    name,
    email,
    password,
    avatar: { public_id: "test id", url: "imageUrl" },
  });
  const jwtToken = user.getJWTToken();
  res.status(201).json({
    success: true,
    user,
    jwtToken,
  });
});

// login user
exports.loginUser = handleAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  // check if user has provided both email and password
  if (!email || !password) {
    return next(
      new Errorhandler("Email or password is not entered. Try again.", 400)
    );
  }
  // user has entered email and password (pass via select as we have mentioned false to retrieve)
  const user = await userSchema.findOne({ email }).select("+password");
  if (!user) {
    return next(
      new Errorhandler(
        "Incorrect email or password. Please check your login credentials.",
        401
      )
    );
  }
  const isPasswordMatched = await user.passwordMatch(password);
  // password matches or not
  if (!isPasswordMatched) {
    return next(
      new Errorhandler(
        "Incorrect email or password. Please check your login credentials.",
        401
      )
    );
  }

  // record matches, so generating a token 
  const jwtToken = user.getJWTToken();
  res.status(200).json({
    success: true,
    jwtToken,
  });
});
