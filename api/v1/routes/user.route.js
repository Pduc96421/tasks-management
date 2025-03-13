const express = require("express");
const router = express.Router();

const controller = require("../controllers/user.controller");

const accountValidate = require("../../../validates/account.validate");

router.post("/register", accountValidate.register, controller.register);

module.exports = router;