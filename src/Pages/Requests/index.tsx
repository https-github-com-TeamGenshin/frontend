import { useEffect } from "react";
import Pusher from "pusher-js";
import { useSelector } from "react-redux";
import { post$getRequest } from "../../API/Request";
import { get$verifyUserToken } from "../../API/Login";
import { Navigator } from "../../Components/Navigator";

export const Request = () => {
  const loginSelector = useSelector((state: any) => state.login);
  useEffect(() => {
    let pendingRequest: string = loginSelector.pendingRequest;

    if (pendingRequest === "") {
      get$verifyUserToken().then((response: any) => {
        console.log(response);
        const data: any = response?.data;
        pendingRequest = data?.pending_request;

        if (pendingRequest) {
          post$getRequest({ request_id: pendingRequest }).then((response) => {
            console.log(response);

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
      post$getRequest({ request_id: pendingRequest }).then((response) => {
        console.log(response);

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

    console.log(loginSelector.pendingRequest);
  }, []);

  // make countdown timer
  // Display the request details
  return (
    <div className="bg-slate-300 w-screen h-screen">
      <Navigator />
      <div className="w-full flex justify-center">
        <div className="bg-white w-[80vw] p-5">
          <div className="bg-slate-600 w-16 h-16 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
