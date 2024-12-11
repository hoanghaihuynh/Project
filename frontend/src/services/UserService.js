import axios from "axios";

// login
export const loginUser = async (data) => {
  const res = await axios.post("http://localhost:3002/api/login/", data);
  return res.data;
};

// register
export const signinUser = async (data) => {
  const res = await axios.post("http://localhost:3002/api/register/", data);
  return res.data;
};
