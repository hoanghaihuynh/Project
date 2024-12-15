import React, { useEffect, useState } from "react";
import { WrapperContainer } from "./style";
import { useNavigate } from "react-router";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import * as message from "../../components/Messages/Message";
import COVER_IMG from "../../assets/smoke.jpg";
import googleLogo_img from "../../assets/google_icon.webp";

const SigninPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const mutation = useMutationHooks((data) => UserService.signinUser(data));
  const { data, isPending, isSuccess, isError } = mutation;

  useEffect(() => {
    if (isSuccess && data?.status !== "ERR") {
      message.success("Đăng ký thành công!");
      handleLogin();
    } else if (data?.status === "ERR") {
      message.error(data?.message || "Đăng ký thất bại!");
    } else if (isError) {
      message.error("Đã có lỗi xảy ra. Vui lòng thử lại.");
    }
  }, [isSuccess, isError, data]);

  const handleOnChangesUsername = (value) => {
    setUsername(value);
  };

  const handleOnChangesPassword = (value) => {
    setPassword(value);
  };

  const handleRegister = () => {
    mutation.mutate({
      username,
      password,
    });
    console.log("register: ", username, password);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <WrapperContainer className="flex justify-center items-center h-screen bg-gray-100 bg-slate-700 w-full">
      <div className="bg-white rounded-lg shadow-lg flex max-w-screen-lg h-4/5 p-3">
        {/* Left Column */}
        <div className="w-[41%] p-8">
          <div className="px-8 pt-7 pb-7">
            <h2 className="text-4xl font-bold mb-2 leading-10 mb-3">Sign up</h2>
            <p className="text-gray-600 text-lg mb-6 mt-7 leading-7 ">
              Sign up to enjoy the feature of MyProject.
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
                <label className="block text-gray-700">Date of birth</label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <div className="relative">
                  <InputForm
                    value={password}
                    handleOnChange={handleOnChangesPassword}
                    type="password"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <i className="fas fa-eye absolute right-3 top-3 text-gray-500"></i>
                </div>
              </div>

              <ButtonComponent
                disabled={!username.length || !password.length}
                onClick={handleRegister}
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
                textButton={"Sign up"}
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
              Continue with Google
              <img
                src={googleLogo_img}
                alt="Google Logo"
                className="w-8 h-8 ml-2"
              />
            </button>
            <p className="text-gray-600 mt-9 text-center">
              Already have an account?{" "}
              <a
                href="#"
                className="text-blue-600 underline-text"
                onClick={handleLogin}
              >
                Sign in
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

export default SigninPage;
