const Task = require("../models/tasks.model");

const paginationHelper = require("../../../helpers/pagination");
const searchHelper = require("../../../helpers/search");

// [GET] /api/v1/tasks
module.exports.index = async (req, res) => {
    const find = {
        deleted: false,
    }

    // tìm kiếmkiếm
    const objectSearch = searchHelper(req.query);

    if (objectSearch.regex) {
        find.title = objectSearch.regex;
    }
    // end tìm kiếm

    // pagination (phân trang)
    let initPagination = {
        currentPage: 1,
        limitItem: 2,
    };

    const countProducts = await Task.countDocuments(find);

    let objectPageination = paginationHelper(
        initPagination,
        req.query,
        countProducts
    );
    // end pagination

    //sort
    const sort = {};

    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue;
    }

    if (req.query.status) {
        find.status = req.query.status;
    }

    const tasks = await Task.find(find)
        .sort(sort)
        .limit(objectPageination.limitItem)
        .skip(objectPageination.skip);

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