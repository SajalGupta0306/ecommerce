const express = require("express");
const productRoute = require("./routes/productRoute");
const app = express();
app.use(express.json());

// importing routes
app.use("/api/v1", productRoute);

module.exports = app;
