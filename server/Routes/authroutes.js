const express = require("express");
const app = express.Router();
const { register, login } = require("../Controller/user_controller");

app.post("/signup", register);
app.post("/login", login);

module.exports = app;
