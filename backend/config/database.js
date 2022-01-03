const mongoose = require("mongoose");

const connectToDB = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((err) => {
      console.log("Error Connecting to database " + err);
    });
};

module.exports = connectToDB;
