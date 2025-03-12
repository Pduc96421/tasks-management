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

// [Pacth] /api/v1/tasks/change-status/:id
module.exports.changeStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.body.status;

        await Task.updateOne({
            _id: id,
        }, {
            status: status,
        });

        res.json({
            code: 200,
            message: "Cập nhật trạng thái thành công",
        });
    } catch (error) {
        res.json({
            code: 400,
            message: "Không tồn tại",
        });
    }

};

// [Pacth] /api/v1/tasks/change-multi/:id
module.exports.changeMulti = async (req, res) => {
    try {
        const { ids, key, value} = req.body;

        switch (key) {
            case "status":
                await Task.updateMany({
                    _id: { $in: ids },
                }, {
                    status: value
                });
                res.json({
                    code: 200,
                    message: "Cập nhật trạng thái thành công",
                });
                break;
        
            default:
                res.json({
                    code: 400,
                    message: "Không tồn tại",
                });
                break;
        }
    } catch (error) {
        res.json({
            code: 400,
            message: "Không tồn tại",
        });
    }

};