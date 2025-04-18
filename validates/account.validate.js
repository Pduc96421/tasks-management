module.exports.register = (req, res, next) => {
  if (!req.body.fullName) {
    res.json({
      code: 400,
      message: "Vui lòng nhập họ tên",
    });
    return;
  }

  if (!req.body.email) {
    res.json({
      code: 400,
      message: "Vui lòng nhập email",
    });
    return;
  }

  if (!req.body.password) {
    res.json({
      code: 400,
      message: "Vui lòng nhập mật khẩu",
    });
    return;
  }
  next(); // sang buoc ke tiep
}

module.exports.login = (req, res, next) => {
  if (!req.body.password) {
    res.json({
      code: 400,
      message: "Vui lòng nhập mật khẩu",
    });
    return;
  }

  if (!req.body.email) {
    res.json({
      code: 400,
      message: "Vui lòng nhập email",
    });
    return;
  }

  next(); // sang buoc ke tiep
}