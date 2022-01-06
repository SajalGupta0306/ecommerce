const express = require("express");
const error = require("./middleware/error");
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const app = express();

app.use(express.json());

// importing routes
app.use("/api/v1", productRoute);
app.use("/api/v1", userRoute);

// importing error component
app.use(error);

module.exports = app;
