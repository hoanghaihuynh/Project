import styled from "styled-components";

export const WrapperContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  margin: 0 auto;
  position: relative;
  top: 50%;

  h1 {
    margin: 60px 0;
    font-weight:400;
  }
  a {
    text-decoration: none;
    color: #3554d1;
  }

  input {
    margin-bottom: 15px;
    width: 100%; /* Đặt chiều rộng của input bằng 100% của khung */
    padding: 10px; /* Thêm padding cho input */
    border: 1px solid #ccc; /* Đường viền cho input */
    border-radius: 4px; /* Bo góc cho input */
  }

  .error-message {
    color: red;
    margin-bottom: 10px; /* Thêm khoảng cách dưới thông báo lỗi */
  }
`;
