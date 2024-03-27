const express = require('express');
const controller = require("../Controllers/UserController");

const router = express.Router();

router
  .post("/register", controller.createUser)
  .post("/login", controller.userLogin);

module.exports = router;