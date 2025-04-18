const express = require("express");
const router = express.Router();

const controller = require("../controllers/task.controller");

const existStatusMiddleware = require("../../../middlewares/existStatus.middleware");

router.get("/", controller.index);

router.get("/detail/:id", controller.detail);

router.patch("/change-status/:id", existStatusMiddleware.existStatus, controller.changeStatus);

router.patch("/change-multi", existStatusMiddleware.existStatus, controller.changeMulti);

router.post("/create", existStatusMiddleware.existStatus, controller.create);

router.patch("/edit/:id", controller.edit);

router.delete("/delete/:id", controller.deleteTask);

module.exports = router;
