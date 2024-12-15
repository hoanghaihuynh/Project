import React, { useEffect, useState } from "react";
import { WrapperContainer } from "./style";
import { useNavigate } from "react-router";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import * as message from "../../components/Messages/Message";
import COVER_IMG from "../../assets/win11-wallpaper.jpg";
import googleLogo_img from "../../assets/google_icon.webp";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const mutation = useMutationHooks((data) => UserService.loginUser(data));
  const { data, isPending, isSuccess, isError } = mutation;
  useEffect(() => {
    if (isSuccess) {
      if (data?.status === "ERR") {
        message.error(
          data?.message || "Đăng nhập không thành công, vui lòng thử lại."
        );
      } else {
        navigate("/home");
        message.success();
        console.log("data: ", data);
        localStorage.setItem("access_token", data?.access_token);
        localStorage.setItem("username", username);
      }
    }
  }, [isSuccess, isError]);

  const handleOnChangesUsername = (value) => {
    setUsername(value);
  };

  const handleOnChangesPassword = (value) => {
    setPassword(value);
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogin = () => {
    if (!username) {
      message.error("Vui lòng nhập tên đăng nhập.");
      return;
    }
    if (!password) {
      message.error("Vui lòng nhập mật khẩu.");
      return;
    }

    mutation.mutate({
      username,
      password,
    });
    console.log("Login: ", username, password);
  };

  return (
    <WrapperContainer className="flex justify-center items-center h-screen bg-gray-100 bg-slate-700 w-full">
      <div className="bg-white rounded-lg shadow-lg flex max-w-screen-lg h-4/5 p-3">
        {/* Left Column */}
        <div className="w-[41%] p-8">
          <div className="px-8 py-20">
            <h2 className="text-4xl font-bold mb-2 leading-10 mb-3">Sign in</h2>
            <p className="text-gray-600 text-lg mb-6 mt-7 leading-7 ">
              Please login to continue to your account.
            </p>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Username</label>
                <InputForm
                  type="text"
                  value={username}
                  handleOnChange={handleOnChangesUsername}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <div className="relative">
                  <InputForm
                    type="password"
                    value={password}
                    handleOnChange={handleOnChangesPassword}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <i className="fas fa-eye absolute right-3 top-3 text-gray-500"></i>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="keep-logged-in"
                  className="mr-2 border border-gray-700"
                />
                <label
                  htmlFor="keep-logged-in"
                  className="text-gray-700 font-bold"
                >
                  Keep me logged in
                </label>
              </div>
              <ButtonComponent
                disabled={!username.length || !password.length}
                onClick={handleLogin}
                border={false}
                size={40}
                styleButton={{
                  width: "100%",
                  background: "#367AFF",
                  height: "54px",
                  border: "none",
                  borderRadius: "4px",
                  margin: "0 0 0",
                }}
                textButton={"Sign in"}
                styleTextButton={{
                  color: "#fff",
                  fontSize: "12px",
                  fontWeight: "500",
                }}
              ></ButtonComponent>
            </form>
            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-2 text-gray-500 my-4">or</span>
              <hr className="flex-grow border-gray-300" />
            </div>
            <button className="font-bold w-full bg-white border border-gray-300 text-gray-700 py-5 rounded-lg flex items-center justify-center hover:bg-gray-100 transition duration-200">
              Sign in with Google
              <img
                src={googleLogo_img}
                alt="Google Logo"
                className="w-8 h-8 ml-2"
              />
            </button>
            <p className="text-gray-600 mt-9 text-center">
              Need an account?{" "}
              <a
                href="#"
                className="text-blue-600 underline-text"
                onClick={handleRegister}
              >
                Create one
              </a>
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-[59%]">
          <img
            src={COVER_IMG}
            alt="Abstract blue waves"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </WrapperContainer>
  );
};

export default LoginPage;
