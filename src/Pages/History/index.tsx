import React, { useEffect } from "react";
import { Navigator } from "../../Components/Navigator";
import { Card } from "./Card";
import { get$AcceptedRequestsOfUser } from "../../API/Accepted";
import { loginAction } from "../../store/login-slice";
import { useSelector, useDispatch } from "react-redux";
import { post$verifyUserToken } from "../../API/Login";

export const History = () => {
  const [Data, setData] = React.useState<any>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    get$AcceptedRequestsOfUser().then((data: any) => {
      console.log(data.data);
      setData(data.data);
    });

    post$verifyUserToken().then((response: any) => {
      // console.log(response);
      const data: any = response?.data;
      let pendingRequest = data?.pending_request;
      const object = {
        _id: response.data.id,
        name: response.data.username,
        email_id: response.data.email_id,
        mobile_no: response.data.mobile_no,
        location: response.data.location,
        pendingRequest: response.data.pending_request,
        role: response.data.role,
      };
      dispatch(loginAction.addLogin({ ...object }));
    });
  }, []);

  return (
    <>
      <div>
        <Navigator />
      </div>
      <div
        className="absolute top-30 flex flex-col flex-shrink items-center justify-center bg-slate-300 w-screen h-[85.5vh] overflow-auto"
        style={{ paddingRight: "1rem" }} // Add right padding to create space for Navigator
      >
        <p className="text-center text-2xl p-4">Upcoming</p>

        {Data.map((data: any, i: number) => {
          return <Card i={i} data={data} bora={1} />;
        })}

        <p className="text-center text-2xl p-4">History</p>
        {Data.map((data: any, i: number) => {
          return <Card i={i} data={data} bora={-1} />;
        })}
      </div>
    </>
  );
};
