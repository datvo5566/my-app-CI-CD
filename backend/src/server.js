//server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRoutes = require("../src/routes/user.route");
const authRoutes = require("../src/routes/auth.route");
const loggerMiddleware = require("../src/middlewares/logger.middlewares");
const errorMiddleware = require("../src/middlewares/error.middlewares");

const app = express();

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);
app.use("/api/v1", userRoutes);
app.use("/api/v1", authRoutes);


app.use(errorMiddleware);


module.exports = app;