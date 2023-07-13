import React, { useRef } from "react";
import { post$loginUser } from "../../API/Login";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import logo from "../../Assets/logo.png";
import {
  UserOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { post$loginDriver } from "../../API/drivers";

export const Login = () => {
  const navigate = useNavigate();

  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [showpassword, setshowpassword] = React.useState<boolean>(false);

  const HandleLoginButton = () => {
    const data = {
      username: usernameRef.current?.value,
      password: passwordRef.current?.value,
    };
    post$loginUser(data).then((res: any) => {
      // console.log(res);
      if (res && res?.status === 200) {
        // console.log(res.data.data.role);
        if (res.data.data.role === "user") {
          navigate("/home");
        } else if (res.data.data.role === "driver") {
          navigate("/driverhome");
        } else if (res.data.data.role === "Admin") {
          navigate("/adminhome");
        }
        message.success("Login Successful");
      } else if ((res && res.status === 400) || res.status === 404) {
        post$loginDriver(data).then((res: any) => {
          if (res && res.status === 200) {
            navigate("/driverhome");
            message.success("Login Successful");
          } else if ((res && res?.status === 400) || res?.status === 404) {
            message.error("Invalid Credentials");
          }
        });
      }
    });
  };

  return (
    <div>
      <div className=" h-full text-black p-8 flex flex-col items-center gap-4">
        <img
          className="w-[20vw] h-[16vw] bg-black rounded-full"
          src={logo}
        ></img>
        <p className="text-2xl font-semibold text-center">Welcome!</p>
      </div>
      <div className="flex flex-col w-screen items-center gap-5">
        <div className="border-2 w-1/3 flex gap-4 border-black px-8 py-1 rounded-xl">
          <UserOutlined className="text-2xl" />
          <input
            ref={usernameRef}
            className=" outline-none p-2 w-[24vw]"
            placeholder="Email Address"
          />
        </div>
        <div className="border-2 w-1/3 flex items-center gap-4 border-black px-8 py-1 rounded-xl">
          <LockOutlined className="text-2xl" />
          <input
            type={showpassword ? "text" : "password"}
            ref={passwordRef}
            className=" outline-none p-2 w-[30vw]"
            placeholder="Password"
          />
          {showpassword && (
            <EyeOutlined onClick={() => setshowpassword(false)} />
          )}
          {!showpassword && (
            <EyeInvisibleOutlined onClick={() => setshowpassword(true)} />
          )}
        </div>
        <button
          style={{ boxShadow: "3px 20px 27px -16px rgba(0,0,0,0.75)" }}
          className="bg-black text-white w-[30vw] text-xl p-3 rounded-xl"
          onClick={() => HandleLoginButton()}
        >
          LOGIN
        </button>
        {/* <button className="text-[#ff942b]">Forgot Password</button> */}
        <div className="flex justify-end w-[30vw] text-[#ff942b]">
          <button onClick={() => navigate("/register")}>Register now!</button>
        </div>
      </div>
    </div>
  );
};
