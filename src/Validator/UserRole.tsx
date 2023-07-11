import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { loginAction } from "../store/login-slice";
import { message } from "antd";
import { post$verifyUserToken } from "../API/Login";
import { sessionActions } from "../store/session-slice";

const UserRole = ({ children, access }: { children: any; access: string }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { role, _id }: { role: string; _id: string, pendingRequest: string } = useSelector(
    (state: any) => state.login
  );
  const [first, setFirst] = useState<boolean>(true);
  const [pendingRequest,setPendingRequest] = useState<String>("");
  

  const Handle$Response$VerifyToken = (data: any) => {
    console.log(data.data.role);
    dispatch(loginAction.addloader({ loader: false }));
    if (data.status === 500) {
      message.error(data.data);
    } else {
      dispatch(sessionActions.addSessionUserID({ user_id: _id }));
      let object: Object;
      console.log(data.data.pending_request)
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
        setPendingRequest(data.data.pending_request);
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
      }
      setFirst(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token") === null && role === "") {
      navigate("/login");
    } else {
      dispatch(loginAction.addloader({ loader: true }));
      post$verifyUserToken()
        .then((data) => Handle$Response$VerifyToken(data))
        .catch((err) => console.log(err));
    }
  }, []);



  if (role !== access && role !== "" && first === false) {
    return <Navigate to="/unauthorized" />;
  }
  if (role === access && pendingRequest && first === false) {
    return <Navigate to="/unauthorized" />;
  }
  if (role === access && _id !== "64ad2bbdd73ea6b35065340e") {
    return children;
  }
  if (role === access && (pendingRequest === undefined || pendingRequest === "")) {
    return children;
  }
};

export default UserRole;
