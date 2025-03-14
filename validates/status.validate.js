module.exports.statusCreate = (req, res, next) => {
    if(!req.body.title){
        res.json({
            code: 400,
            message: "Vui lòng nhập tên trạng thái",
        });
        return;
    }
    next(); // sang buoc ke tiep
}

