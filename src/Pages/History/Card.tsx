import React, { useEffect } from "react";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { post$AcceptedOneRequestOfUser } from "../../API/Accepted";
const BeforeOrAfter = (dateTime: string) => {
  const currentDateTime = new Date();

  // Convert the given datetime string to a Date object
  const givenDateTime = new Date(dateTime);

  // Compare the two dates
  if (givenDateTime < currentDateTime) {
    return -1;
  } else if (givenDateTime > currentDateTime) {
    return 1;
  } else {
    return 0;
  }
};

export const Card = ({
  i,
  data,
  bora,
}: {
  i: number;
  data: any;
  bora: number;
}) => {
  const dateTime = data.start_date;

  const [show, setshow] = React.useState<boolean>(false);
  const [showData, setShowData] = React.useState<any>({});

  //   useEffect(() => {
  //     const _id: string = data?._id.toString();
  //     post$AcceptedOneRequestOfUser({ _id: _id }).then((data: any) => {
  //       console.log(data);
  //       // setData(data.data);
  //     });
  //   }, []);

  return (
    <div className="rounded-lg" key={i}>
      <div
        className={`${
          BeforeOrAfter(dateTime) === bora && "hidden"
        } w-full flex flex-col items-center justify-center transition-opacity duration-300 mb-2 rounded-lg`}
      >
        <div className="bg-white w-[50vw] p-5 flex justify-between items-center gap-10 transition-transform duration-300 rounded-lg hover:scale-105 ">
          <img src={data.imageurl} className="w-24 h-24 rounded-full" />
          <div>
            <div className="text-lg">Driver Name: {data.driver_name}</div>
            <div className="text-lg">
              Start Date: {new Date(data.start_date).toLocaleDateString()}
            </div>
            <div className="text-lg">
              Start Time: {new Date(data.start_date).toLocaleTimeString()}
            </div>
            <div className="text-lg">
              Register Number: {data.model_registration_no}
            </div>
          </div>
          {!show && (
            <div
              onClick={() => {
                setshow(true);
                const _id: string = data?._id.toString();
                console.log(_id);
                post$AcceptedOneRequestOfUser({ _id: _id }).then(
                  (data: any) => {
                    console.log(data);
                    setShowData(data.data);
                  }
                );
              }}
              className="text-3xl cursor-pointer"
            >
              <DownOutlined />
            </div>
          )}
          {show && (
            <div
              onClick={() => setshow(false)}
              className="text-3xl cursor-pointer"
            >
              <UpOutlined />
            </div>
          )}
        </div>
        {show && (
          <div className="bg-white w-[55vw] p-5 mt-5 mb-5 transition-all duration-300">
            <div>
              <p className="text-lg">Type: {showData.type}</p>
              <p className="text-lg">Car Name: {showData.model_name}</p>
              <p className="text-lg">Payable Amount: {showData.total_amount}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
