const md5 = require("md5");
const User = require("../models/user.model");

// [Post] /api/v1/users/register
module.exports.register = async (req, res) => {
    req.body.password = md5(req.body.password);
    const existEmail = await User.findOne({
        email: req.body.email,
        deleted: false,
    });

    if (existEmail) {
        res.json({
            code: 400,
            message: "email đã tồn tại",
        });
    } else {
        const user = new User(req.body);
        await user.save();

        const token = user.token;
        res.cookie("token", token);

        res.json({
            code: 200,
            message: "Tạo tài khoản thành công ",
            token: token,
        });
    }
};

// [Post] /api/v1/users/login
module.exports.login = async (req, res) => {
    const email = req.body.email;
    const password = md5(req.body.password);
    const user = await User.findOne({
        email: email,
        deleted: false,
    });

    if (!user) {
        res.json({
            code: 400,
            message: "email không tồn tại",
        });
        return;
    }

    if (password !== user.password){
        res.json({
            code: 400,
            message: "sai mật khẩu",
        });
        return;
    }

    const token = user.token;
    res.cookie("token", token);

    res.json({
        code: 200,
        message: "Đăng nhập thành công",
        token: token,
    });
};