const app = require("./app");
const env = require("dotenv");
const connectToDB = require("./config/database");

// Uncaught error: Eg - printing variables which are never defined
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to uncaught exceptions");
  process.exit(1);
});

// config file
env.config({ path: "backend/config/config.env" });

// connecting to database
connectToDB();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejections: Eg - giving wrong mongo url
// used when there is no catch block for the mongoose connection in database.js
// process.on("unhandledRejection", (error) => {
//   console.log(`Error: ${error.message}`);
//   console.log("Shutting down the server due to unhandled promise rejections");
//   server.close(() => {
//     process.exit(1);
//   });
// });
