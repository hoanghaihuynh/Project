const UserService = require('../services/UserService');

// Register
const createUser = async (req, res) => {
    try {
        // console.log(req.body);
        const { username, password } = req.body;
        const reg = /[!@#$%^&*()_+\-=\[\]{}|;:',.<>?/`~]/;
        const isCheckUsername = reg.test(username); // Kí tự đặc biệt
        
        if (!username || !password) {
            return res.status(400).json(
                {
                    status: "ERR",
                    code: 400,
                    message: 'Không được để trống'
                }
            );
        }

        if (isCheckUsername) {
            return res.status(400).json({
                status: "ERR",
                code: 400,
                message: 'Tên đăng nhập không chứa phải chứa ký tự đặc biệt',
            });
        }

        const response = await UserService.createUser(req.body);
        return res.status(200).json(response);
    }
    catch (err) {
        return res.status(400).json({
            status: "ERR",
            code: 400,
            message: err,
        })
    }
}

//Log in user
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json(
                {
                    code: 400,
                    message: 'Không được để trống'
                }
            );
        }
        const response = await UserService.loginUser(req.body);
        const { refresh_token, ...newResponse } = response;
        res.cookie('refresh_token', refresh_token, {
            HttpOnly: true,
            Secure: true
        })

        return res.status(200).json(newResponse);
    }
    catch (err) {
        return res.status(400).json({
            status: "ERR",
            code: 400,
            message: err,
        })
    }
}

// Update
const updateUser = async (req, res) => {
    try {
        const user_id = req.params.id;
        const data = req.body;

        if(!user_id) {
            return res.status(400).json(
                {
                    code: 400,
                    message: 'Yêu cầu id user'
                }
            );
        }

        const response = await UserService.updateUser(user_id, data);
        return res.status(200).json(response);
    }
    catch (err) {
        return res.status(400).json({
            code: 400,
            message: err,
        })
    }
}

// detail
const getUser = async (req, res) => {
    try {
        const user_id = req.params.id;
        const data = req.body;

        if(!user_id) {
            return res.status(400).json(
                {
                    code: 400,
                    message: 'Yêu cầu id user'
                }
            );
        }

        const response = await UserService.getUser(user_id, data);
        return res.status(200).json(response);
    }
    catch (err) {
        return res.status(400).json({
            code: 400,
            message: err,
        })
    }
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    getUser
}