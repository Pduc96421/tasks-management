const express = require("express");
const router = express.Router();

const controller = require("../controllers/status.controller");

const validateStatus = require("../../../validates/status.validate");

router.post("/create", validateStatus.statusCreate, controller.create);

router.delete("/delete/:id", controller.delete);

module.exports = router;