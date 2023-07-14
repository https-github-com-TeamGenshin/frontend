import { useState } from "react";
import { Loader } from "../../../Components/Loader/Loader";
import { Rate } from "antd";

export const Card = ({
  cid,
  id,
  setcid,
  driver,
  Handler,
}: {
  cid: number;
  Handler: any;
  id: number;
  setcid: any;
  driver: any;
}) => {
  const [loader, setloader] = useState<boolean>(true);

  setTimeout(() => {
    setloader(false);
  }, 5000);

  return (
    <div className="relative w-84 h-72" key={id}>
      {loader && <Loader loader={loader} />}
      <div
        onMouseEnter={() => setcid(id)}
        onMouseLeave={() => setcid(-1)}
        style={{
          backgroundColor: "rgba(17, 25, 40, 0.20)",
          backdropFilter: "blur(16px) saturate(200%)",
        }}
        className="cursor-pointer rounded-xl p-3 w-84"
        onClick={() => Handler(driver)}
      >
        <img
          onLoad={() => setloader(false)}
          className="w-56 h-48"
          src={driver.imageurl}
        ></img>
        <div className="p-3 flex flex-col w-full justify-between">
          <div>{driver.username}</div>
          <Rate className="text-sm" allowHalf defaultValue={driver.rating} />
        </div>
        <div
          className={` rounded-xl opacity-80 flex flex-col justify-center items-center gap-5 w-full h-full text-white absolute top-0 left-0 ${
            cid === id ? "" : "hidden"
          } bg-slate-700 `}
        >
          <p>Experience Year : {driver.experience_years}</p>
          <p>Hourly Rate : {driver.rate_per_hrs}</p>
          <p>Kilometer Rate : {driver.rate_per_km}</p>
          <p>Age : {driver.age}</p>
          <p></p>
        </div>
      </div>
    </div>
  );
};
