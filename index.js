const express = require("express");
const database = require("./config/database");
require("dotenv").config();
const app = express();
const port = process.env.port;

database.connect();

const Task = require("./models/tasks.model");

app.get("/tasks", async (req, res) => {
    const tasks = await Task.find({
        deleted: false,
    });

    res.json(tasks);
});

app.get("/tasks/detail/:id", async (req, res) => {
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

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});