const Task = require("../models/tasks.model");

// [GET] /api/v1/tasks
module.exports.index = async (req, res) => {
    const find = {
        deleted: false,
    }
    if (req.query.status) {
        find.status = req.query.status;
    }

    const tasks = await Task.find(find);

    res.json(tasks);
};

// [GET] /api/v1/tasks/detail/:id
module.exports.detail = async (req, res) => {
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
};