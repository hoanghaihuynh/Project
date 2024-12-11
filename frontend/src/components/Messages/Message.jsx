import { message } from 'antd';

const success = (mes = 'Đăng nhập thành công!') => {
    message.success(mes);
}

const error = (mes = 'Đã có lỗi!') => {
    message.error(mes);
}

const warning = (mes = 'Cảnh báo!') => {
    message.warning(mes);
}

export {success, error, warning}