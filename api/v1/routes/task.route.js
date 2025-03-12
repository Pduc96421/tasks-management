const express = require("express");
const router = express.Router();

// const controller = require("../../controllers/client/task.controller");

const Task = require("../../../models/tasks.model");

router.get("/", async (req, res) => {
    const tasks = await Task.find({
        deleted: false,
    });

    res.json(tasks);
});

router.get("/detail/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const tasks = await Task.findOne({
            deleted: false,
            _id: id,
        });

        res.json(tasks);
    } catch (error) {
        res.json("không tìm thấy");
    }
});

module.exports = router;