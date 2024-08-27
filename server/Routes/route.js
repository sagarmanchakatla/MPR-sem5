const express = require("express");
const router = express.Router();

const {
  handleLoginUser,
  handleUserRegister,
} = require("../Controller/user_controller.js");

router.post("/register", handleUserRegister);
router.post("/login", handleLoginUser);

module.exports = router;
