import "./Splash.css";
import { RightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../store/login-slice";
import { post$verifyUserToken } from "../../API/Login";
import { message } from "antd";
import { sessionActions } from "../../store/session-slice";

export const Splash = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Handle$Response$VerifyToken = (data: any) => {
    // console.log(data.data.role);
    dispatch(loginAction.addloader({ loader: false }));
    if (data.status === 500) {
      message.error(data.data);
    } else {
      dispatch(sessionActions.addSessionUserID({ user_id: data.data.id }));
      let object: Object;
      // console.log(data.data.pending_request)
      if (data.data.role === "user") {
        object = {
          _id: data.data.id,
          name: data.data.username,
          email_id: data.data.email_id,
          mobile_no: data.data.mobile_no,
          location: data.data.location,
          pendingRequest: data.data.pending_request,
          role: data.data.role,
        };
        dispatch(loginAction.addLogin({ ...object }));
        navigate("/home");
      }
      if (data.data.role === "driver") {
        object = {
          id: data.data._id,
          name: data.data.username,
          email_id: data.data.email_id,
          mobile_no: data.data.mobile_no,
          rating: data.data.rating,
          experience_years: data.data.experience_years,
          location: data.data.location,
          rate_per_km: data.data.rate_per_km,
          rate_per_hrs: data.data.rate_per_hrs,
          role: data.data.role,
        };
        dispatch(loginAction.addDriverLogin({ ...object }));
        navigate("/driverhome");
      }
      if (data.data.role === "Admin") {
        object = {
          _id: data.data.id,
          name: data.data.username,
          email_id: data.data.email_id,
          mobile_no: data.data.mobile_no,
          location: data.data.location,
          role: data.data.role,
        };
        dispatch(loginAction.addLogin({ ...object }));
        navigate("/adminhome");
      }
    }
  };

  const eventHandler = () => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
    } else {
      dispatch(loginAction.addloader({ loader: true }));
      post$verifyUserToken()
        .then((data) => Handle$Response$VerifyToken(data))
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="bg-slate-800 h-screen w-screen flex items-end justify-center">
      <div className="black-container bg-white flex  justify-center items-center text-black w-screen rounded-b-full absolute top-0 z-10">
        <div className="flex flex-col gap-10 items-center">
          <img
            width="84"
            height="84"
            src="https://img.icons8.com/cotton/128/cab-waiting.png"
            alt="cab-waiting"
          />
          <div className="text-center text-2xl">
            CAB <br /> FINDER
          </div>
        </div>
      </div>
      <div className="text-white flex flex-col gap-10 p-16 justify-center items-center">
        <div className="font-extralight text-3xl text-center">
          Find Your <br />
          Destination
        </div>
        <div
          onClick={eventHandler}
          className=" cursor-pointer flex items-center gap-4 px-12 py-1 rounded-full border-2 border-orange-600"
        >
          <section className="text-orange-600 font-bold">CONTINUE</section>
          <RightOutlined className="text-orange-600" />
        </div>
      </div>
    </div>
  );
};
