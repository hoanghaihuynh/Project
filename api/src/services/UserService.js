const User = require("../models/UserModel");
const bcrypt = require('bcrypt');
const { generalAccessToken, generalRefreshToken } = require("./JwtService");

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { username, password } = newUser;
        try {
            // Check if the username already exists
            const checkUsername = await User.findOne({ username: username });
            if (checkUsername !== null) {
                return resolve({
                    status: "ERR",
                    message: 'Username bị trùng',
                });
            }

            // Hash the password if username is available
            let hash = bcrypt.hashSync(password, 10);

            // Create new user with the hashed password
            const createdUser = await User.create({
                username,
                password: hash
            });

            if (createdUser) {
                resolve({
                    message: 'Đăng ký thành công',
                    code: 200,
                    data: createdUser
                });
            }
        } catch (err) {
            reject(err);
        }
    });
}


// Login User
const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { username, password } = userLogin;
        try {
            const checkUsername = await User.findOne({
                username: username 
            });
            if (checkUsername === null) {
                resolve({
                    status: 'ERR',
                    message: 'Sai mật khẩu hoặc tài khoản không tồn tại',
                })
            }

            // so sánh mk
            const comparePassword = bcrypt.compareSync(password, checkUsername.password);
            
            // mk sai
            if (!comparePassword) {
                resolve({
                    status: 'ERR',
                    message: 'Sai mật khẩu',
                })
            }

            // 
            const access_token = await generalAccessToken({
                id: checkUsername.id
            });
            // console.log('Access token: ', access_token);

            //
            const refresh_token = await generalRefreshToken({
                id: checkUsername.id
            });
            // console.log("Refresh token: ",refresh_token);

            resolve({
                message: 'Đăng nhập thành công',
                code: 200,
                access_token: access_token,
                refresh_token: refresh_token,
                data: checkUsername
            });
          
        }
        catch (err) {
            reject(err);
        }
    }) 
}


// Update User
const updateUser = (id,data) => {
    return new Promise(async (resolve, reject) => {

        try {
            const checkUsername = await User.findOne({
                _id: id
            });
            // console.log('Check user: ', checkUsername);
            if (checkUsername === null) {
                resolve({
                    message: 'Không tồn tại user này',
                })
            }

            const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
            // console.log("update user", updatedUser);

            resolve({
                message: 'Tìm thấy User ID và Update User THÀNH CÔNG',
                code: 200,
                data: updatedUser
            });
          
        }
        catch (err) {
            reject(err);
        }
    }) 
}

// Detail User
const getUser = (id,data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUsername = await User.findOne({
                id: id
            });
            // console.log('Check user: ', checkUsername);

            const userDetail = await User.findById(id, data);
            // console.log("update user", userDetail);

            resolve({
                message: 'Tìm thấy User',
                code: 200,
                data: userDetail
            });
          
        }
        catch (err) {
            reject(err);
        }
    }) 
}


module.exports = {
    createUser,
    loginUser,
    updateUser,
    getUser
}