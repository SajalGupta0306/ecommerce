const express = require("express");
const error = require("./middleware/error");
const productRoute = require("./routes/productRoute");
const app = express();

app.use(express.json());

// importing routes
app.use("/api/v1", productRoute);

// importing error component
app.use(error);

module.exports = app;
