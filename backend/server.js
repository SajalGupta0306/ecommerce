const app = require("./app");
const env = require("dotenv");
const connectToDB = require("./config/database");

// config file
env.config({ path: "backend/config/config.env" });

// connecting to database
connectToDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
