import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { loginAction } from "../store/login-slice";
import { message } from "antd";
import { get$verifyUserToken } from "../API/Login";

const UserRole = ({ children, access }: { children: any; access: string }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { role, _id }: { role: string; _id: string } = useSelector(
    (state: any) => state.login
  );

  const Handle$Response$VerifyToken = (data: any) => {
    console.log(data.data.role);
    dispatch(loginAction.addloader({ loader: false }));
    if (data.status === 500) {
      message.error(data.data);
    } else {
      let object: Object;
      if (data.data.role === "user") {
        object = {
          _id: data.data.id,
          name: data.data.username,
          email_id: data.data.email_id,
          mobile_no: data.data.mobile_no,
          location: data.data.location,
          role: data.data.role,
        };
        dispatch(loginAction.addLogin({ ...object }));
      }
      if (data.data.role === "driver") {
        object = {
          id: data.data._id,
          username: data.data.username,
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
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token") === null && role === "") {
      navigate("/login");
    } else {
      dispatch(loginAction.addloader({ loader: true }));
      get$verifyUserToken()
        .then((data) => Handle$Response$VerifyToken(data))
        .catch((err) => console.log(err));
    }
  }, []);

  if (!role) {
    console.log("Hum first hum first");
    console.log(role);
    return <Navigate to="/unauthorized" />;
  }
  if (role === access && _id !== "64917e44fbe829eda5f5d7c2") {
    return children;
  }
  if (role === access) {
    return children;
  }
};

export default UserRole;
