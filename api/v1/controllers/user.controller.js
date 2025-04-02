const md5 = require("md5");
const User = require("../models/user.model");
const ForgotPassword = require("../models/forgot-password.model");

const generateHelper = require("../../../helpers/generate");
const sendMailHelper = require("../../../helpers/sendMail");

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

  if (password !== user.password) {
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

// [Post] /api/v1/users/password/forgot
module.exports.forgotPassword = async (req, res) => {
  const email = req.body.email;

  const user = await User.findOne({
    email: email,
    deleted: false,
  });

  if (!user) {
    res.json({
      code: 400,
      message: "email khong ton tai",
    });
    return;
  }

  const timeExpire = 5;

  const otp = generateHelper.generateRandomNumber(8);

  const objectForgotPassword = {
    email: email,
    otp: otp,
    expireAt: Date.now() + timeExpire * 60,
  };

  const forgotPassword = new ForgotPassword(objectForgotPassword);
  await forgotPassword.save();

  // 2:  gửi mã otp qua email của user
  const subject = "Mã OTP lấy lại mật khẩu.";
  const htmlSendMail = `Mã OTP xác thực của bạn là <b style="color: green;">${otp}</b>. Mã OTP có hiệu lực trong 3 phút. Vui lòng không cung cấp mã OTP cho người khác.`;

  sendMailHelper.sendEmail(email, subject, htmlSendMail);
  // end 2:  gửi mã otp qua email của user

  res.json({
    code: 200,
    message: "da gui ma OTP qua email",
  });
};

// [Post] /api/v1/users/password/otp
module.exports.otpPassword = async (req, res) => {
  const email = req.body.email;
  const otp = req.body.otp;

  const result = await ForgotPassword.findOne({
    email: email,
    otp: otp,
  });

  if (!result) {
    res.json({
      code: 400,
      message: "OTP khong hop le",
    });
    return;
  }

  const token = User.token;
  res.cookie("token", token);

  res.json({
    code: 200,
    message: "xac thuc thanh cong",
    token: token,
  });
};

// [Post] /api/v1/users/password/reset
module.exports.resetPassword = async (req, res) => {
  const password = req.body.password;
  const token = req.body.token;

  const user = await User.findOne({
    token: token,
  });

  if (md5(password) == user.password) {
    res.json({
      code: 400,
      message: "vui long nhap mat khau moi khac mat khau moi",
    });
    return;
  }

  await User.updateOne(
    {
      token: token,
    },
    {
      password: md5(password),
    }
  );

  res.json({
    code: 200,
    message: "doi mat khau thanh cong",
  });
};
