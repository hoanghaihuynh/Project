const UserService = require("../services/UserService");

// Register
const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const validUsernameRegex = /^[a-zA-Z0-9_]+$/; // Ký tự hợp lệ
    const containsWhitespaceRegex = /\s/;

    // Kiểm tra không được để trống
    if (!username || !password) {
      return res.status(400).json({
        status: "ERR",
        code: 400,
        message: "Không được để trống",
      });
    }

    // Kiểm tra username chỉ chứa ký tự hợp lệ
    if (!validUsernameRegex.test(username)) {
      return res.status(400).json({
        status: "ERR",
        code: 400,
        message:
          "Tên đăng nhập chỉ được chứa chữ cái, số, và dấu gạch dưới. Không được chứa khoảng trắng hoặc ký tự đặc biệt.",
      });
    }

    // Kiểm tra độ dài username
    if (username.length < 6 || username.length > 30) {
      return res.status(400).json({
        status: "ERR",
        code: 400,
        message: "Tên đăng nhập phải từ 6 đến 30 ký tự",
      });
    }

    // Kiểm tra độ dài password
    if (password.length < 8 || password.length > 50) {
      return res.status(400).json({
        status: "ERR",
        code: 400,
        message: "Mật khẩu phải từ 8 đến 50 ký tự",
      });
    }

    // Kiểm tra mật khẩu trùng với tên đăng nhập
    if (password === username) {
      return res.status(400).json({
        status: "ERR",
        code: 400,
        message: "Mật khẩu không được giống với tên đăng nhập",
      });
    }

    // Kiểm tra mật khẩu không được chứa khoảng trắng
    if (containsWhitespaceRegex.test(password)) {
      return res.status(400).json({
        status: "ERR",
        code: 400,
        message: "Mật khẩu không được chứa khoảng trắng",
      });
    }

    // Tạo user
    const response = await UserService.createUser(req.body);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(400).json({
      status: "ERR",
      code: 400,
      message: err,
    });
  }
};

//Log in user
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        code: 400,
        message: "Không được để trống",
      });
    }
    const response = await UserService.loginUser(req.body);
    const { refresh_token, ...newResponse } = response;
    res.cookie("refresh_token", refresh_token, {
      HttpOnly: true,
      Secure: true,
    });

    return res.status(200).json(newResponse);
  } catch (err) {
    return res.status(400).json({
      status: "ERR",
      code: 400,
      message: err,
    });
  }
};

// Update
const updateUser = async (req, res) => {
  try {
    const user_id = req.params.id;
    const data = req.body;

    if (!user_id) {
      return res.status(400).json({
        code: 400,
        message: "Yêu cầu id user",
      });
    }

    const response = await UserService.updateUser(user_id, data);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(400).json({
      code: 400,
      message: err,
    });
  }
};

// detail
const getUser = async (req, res) => {
  try {
    const user_id = req.params.id;
    const data = req.body;

    if (!user_id) {
      return res.status(400).json({
        code: 400,
        message: "Yêu cầu id user",
      });
    }

    const response = await UserService.getUser(user_id, data);
    return res.status(200).json(response);
  } catch (err) {
    return res.status(400).json({
      code: 400,
      message: err,
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  getUser,
};
