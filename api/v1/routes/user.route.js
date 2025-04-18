const express = require("express");
const router = express.Router();

const controller = require("../controllers/user.controller");

const accountValidate = require("../../../validates/account.validate");

router.post("/register", accountValidate.register, controller.register);

router.post("/login", accountValidate.login, controller.login);

// router.post("/logout", controller.logout);

router.post("/password/forgot", controller.forgotPassword);

router.post("/password/otp", controller.otpPassword);

router.post("/password/reset", controller.resetPassword);

router.get("/detail", controller.detail);

module.exports = router;
