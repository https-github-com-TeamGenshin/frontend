import React, { useEffect } from "react";
import { Navigator } from "../../../Components/Navigator";
import {
  post$getRequest,
  post$RequestAccepted,
  post$RequestRejected,
} from "../../../API/drivers";
import { useNavigate } from "react-router-dom";
import { post$verifyUserToken } from "../../../API/Login";
import { useSelector } from "react-redux";

export const DriverPending = () => {
  const [Data, setData] = React.useState<any>([]);
  const driverSelector = useSelector((state: any) => state.login);
  useEffect(() => {
    post$getRequest({ _id: driverSelector._id })
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navigate = useNavigate();

  const Handle$OnClick$AcceptedButton = (id: string) => {
    post$RequestAccepted({
      request_id: id,
    })
      .then((res) => {
        navigate("/driveraccepted");
        //console.log(res.data)
      })
      .catch((err) => {
        //  console.log(err)
      });
  };

  const Handle$OnClick$RejectedButton = (id: string) => {
    post$RequestRejected({
      request_id: id,
    })
      .then((res) => {
        navigate("/driveraccepted");
        // console.log(res.data)
      })
      .catch((err) => {
        // console.log(err)
      });
  };

  const Dateoptions: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  return (
    <div>
      <Navigator />
      {Data?.length !== 0 && Array.isArray(Data) ? (
        Data?.reverse().map((item: any, i: number) => {
          const link = `https://maps.google.com/maps?q=${item?.location?.latitude},${item.location?.longitude}&z=15&output=embed`;
          return (
            <div key={i}>
              <div className="flex items-center justify-evenly">
                <div className="text-center">
                  <img className="w-64" src={item.imageurl}></img>
                  <p>{item.model_name}</p>
                </div>
                <div>
                  {new Date(item.start_date).toLocaleDateString(
                    undefined,
                    Dateoptions
                  )}{" "}
                  {new Date(item.start_date).toLocaleTimeString()}
                  {item.kms && <p>Kilometers : {item.kms}</p>}
                  {item.time_required && (
                    <p>Time Required : {item.time_required}</p>
                  )}
                  {/* {<p ref={timeref}></p>} */}
                </div>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() =>
                      Handle$OnClick$AcceptedButton(item.request_id)
                    }
                    className="w-36 text-blue-500 border-2 py-2 px-8 border-blue-500"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() =>
                      Handle$OnClick$RejectedButton(item.request_id)
                    }
                    className="w-36 text-red-500 border-2 py-2 px-8 border-red-500"
                  >
                    Reject
                  </button>
                </div>
                <iframe src={link}></iframe>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center text-gray-700 mt-4">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold">No Pending Requests</h2>
            <p>You have no pending requests at this time.</p>
          </div>
        </div>
      )}
    </div>
  );
};
