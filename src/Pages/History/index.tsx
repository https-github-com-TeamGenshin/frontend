import React, { useEffect } from "react";
import { Navigator } from "../../Components/Navigator";
import { Card } from "./Card";
import { get$AcceptedRequestsOfUser } from "../../API/Accepted";

export const History = () => {
  const [Data, setData] = React.useState<any>([]);

  useEffect(() => {
    get$AcceptedRequestsOfUser().then((data: any) => {
      // console.log(data)
      setData(data.data);
    });
  }, []);

  return (
    <>
      <Navigator />
      <div className="flex flex-col items-center justify-center bg-slate-300 w-screen h-[85.5vh] overflow-y-auto">
        <p className="text-center text-2xl p-4">Before</p>
        {Data.map((data: any) => {
          return <Card data={data} bora={1} />;
        })}
        <p className="text-center text-2xl p-4">After</p>
        {Data.map((data: any) => {
          return <Card data={data} bora={-1} />;
        })}
      </div>
    </>
  );
};
