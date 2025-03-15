const Status = require("../models/status.model");

// [Post] /api/v1/tasks/status/create
module.exports.create = async (req, res) => {
  try {
    const title = req.body.title;
    const existStatus = await Status.findOne({
      title: title,
      deleted: false,
    });

    if (existStatus) {
      res.json({
        code: 400,
        message: "Đã tồn tại trạng thái này",
      });
    } else {
      const status = new Status(req.body);
      await status.save();

      res.json({
        code: 200,
        message: "Tạo mới thành công",
      });
    }

  } catch (error) {
    res.json({
      code: 400,
      message: "Không tồn tại",
    });
  }
};

// [Delete] /api/v1/status/delete/:id
module.exports.delete = async (req, res) => {
  try {
    const id = req.params.id;

    await Status.updateOne({
      _id: id,
    }, {
      deleted: true,
      deletedAt: new Date(),
    });

    res.json({
      code: 200,
      message: "xóa thành công",
    });

  } catch (error) {
    res.json({
      code: 400,
      message: "Không tồn tại",
    });
  }
};