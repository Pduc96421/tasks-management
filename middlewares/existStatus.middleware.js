const Status = require("../api/v1/models/status.model");

module.exports.existStatus = async (req, res, next) => {
    if (req.body.status) {
        const status = req.body.status;

        const existStatus = await Status.findOne({
            title: status,
            deleted: false,
        });

        if (!existStatus) {
            res.json({
                code: 400,
                message: "không tồn tại status này",
            });
            return;
        }
    }
    next(); // sang buoc ke tiep
}