import { useEffect, useState, useRef } from "react";
import Pusher from "pusher-js";
import { useSelector } from "react-redux";
import { post$getRequest } from "../../API/Request";
import { post$verifyUserToken } from "../../API/Login";
import { Navigator } from "../../Components/Navigator";
import { useNavigate } from "react-router-dom";


export const Request = () => {

  const [Data, setData] = useState<any>({});
  const [RealTimeData, setRealTimeData] = useState<any>([]);
  const [dateOnly, setDateOnly] = useState<any>("");
  const timeref = useRef<any>(null);

  const navigate = useNavigate();


  const loginSelector = useSelector((state: any) => state.login);

  useEffect(() => {
    let pendingRequest: string = loginSelector.pendingRequest;

    if (pendingRequest === "" || pendingRequest === undefined) {
      post$verifyUserToken().then((response: any) => {
        console.log(response);
        const data: any = response?.data;
        pendingRequest = data?.pending_request;

        if (pendingRequest) {
          post$getRequest({ request_id: pendingRequest }).then((response) => {
            console.log(response);
            setData(response.data);

            Pusher.logToConsole = true;
            const pusher = new Pusher("2d17248b4e85ba67a14c", {
              cluster: "ap2",
            });

            const channel = pusher.subscribe("Requests");
            channel.bind(pendingRequest, function (data: any) {
              console.log(data);
            });
          });
        }
      });
    } else {
      console.log(pendingRequest)
      post$getRequest({ request_id: pendingRequest }).then((response) => {
        setData(response.data)
        Pusher.logToConsole = true;
        const pusher = new Pusher("2d17248b4e85ba67a14c", {
          cluster: "ap2",
        });

        const channel = pusher.subscribe("Requests");
        channel.bind(pendingRequest, function (data: any) {
          if (data?.request_status === "Accepted") {
            console.log("Accepted")
            setData(data)
          }
        });
      });
    }

    // console.log(loginSelector.pendingRequest);
  }, []);

  useEffect(() => {
    console.log(Data)
    var interval : any
    if (Data?.request_status === "Pending") {
      const time = new Date(Data.createdAt)
      console.log(time.getTime())
      time.setMinutes(time.getMinutes() + 15);
      interval = setInterval(() => {
        console.log("Hello")
        const timeDifference = (time.getTime() - new Date().getTime()) / 1000;
        if (!timeDifference) return
        if (timeDifference < 0) {
          // navigate("/requests")
        }
        const minutes = Math.floor(timeDifference / 60);
        const seconds = Math.floor(timeDifference % 60);
        if (timeref.current)
          timeref.current.innerHTML = `${minutes} minutes and ${seconds} seconds`;
      }, 1000)
      // console.log("Came Here")
    }
    if (Data?.request_status === "Accepted") {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [Data]);

  const Dateoptions: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
  // make countdown timer
  const link = `https://maps.google.com/maps?q=${Data?.location?.latitude},${Data.location?.longitude}&z=15&output=embed`
  // console.log(link)
  // Display the request details
  return (
    <div className="bg-slate-300 w-screen h-screen">
      <Navigator />
      {
        Data._id !== undefined ?
          <div className="w-full flex justify-center">
            <div className="bg-slate-300 w-[80vw] p-5 flex items-center space-x-4 ">
              <div className="relative w-32 h-32 rounded-full overflow-hidden">
                <img src={Data.imageurl} alt="Profile Image" className="object-cover w-full h-full" />
              </div>
              <div>
                <div className="text-gray-600">CreatedAt: {new Date(Data.createdAt).toLocaleDateString(undefined, Dateoptions)} {new Date(Data.createdAt).toLocaleTimeString()}</div>
                <div className="text-gray-800 font-bold">Driver Name: {Data.driver_name}</div>
                <div className="text-gray-800 font-bold">Car Name: {Data.model_name}</div>
                <div>Number Plate: {Data.model_registration_no}</div>
                <div>Journey Start Date: {new Date(Data.start_date).toLocaleDateString()}</div>
                <div>Journey Start Time: {new Date(Data.start_date).toLocaleTimeString()}</div>
                {<iframe src={link}></iframe>}
                <div className="text-gray-600">Status: {Data.request_status}</div>
                {Data?.request_status === "Pending" && <div ref={timeref}></div> } 
              </div>
            </div>
          </div> : <div className="text-center text-gray-700 mt-4">
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl font-bold">No Pending Requests</h2>
              <p>You have no pending requests at this time.</p>
            </div>
          </div>
      }
    </div>
  );
};
