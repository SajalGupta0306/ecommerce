const Errorhandler = require("../utils/errorhandler");

// method to display "Not Found" errors in the controller file
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // handle wrong mongodb Id error while making CRUD request
  if (err.name === "CastError") {
    const message = `Resource not found: ${err.path}`;
    err = new Errorhandler(message, 404);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    error: err.stack,
  });
};
