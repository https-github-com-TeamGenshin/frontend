import React, { useEffect, useState, useRef } from "react";
import { put$getDrivers } from "../../../API/drivers";
import { useDispatch, useSelector } from "react-redux";
import { sessionActions } from "../../../store/session-slice";
import { useNavigate } from "react-router-dom";
import { Navigator } from "../../../Components/Navigator";
import { Pagination, message } from "antd";
import Background from "../../../Assets/background1.png";
import { Rate } from "antd";

export const Driver = () => {
  const [drivers, setDrivers] = React.useState<any>([]);

  const [hrs_rate, sethrs_rate] = useState<boolean>(true);
  const [kms_rate, setkms_rate] = useState<boolean>(true);
  const [rating, setrating] = useState<number>(1);
  const [experience_years, setexperience_years] = useState<number>(1);
  const [chunk, setchunk] = useState<number>(1);
  const [cid, setcid] = useState<number>(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalChunk = useRef<number | undefined>(0);

  const {
    cab_id,
    hourly_rate,
    kms_rate: kmr,
  } = useSelector((state: any) => state.session);
  const { city, RequestDetails } = useSelector((state: any) => state.login);

  useEffect(() => {
    setDrivers([]);
    console.log(city);
    put$getDrivers(
      {
        rating: rating || 1,
        experience_years: experience_years || 1,
        type: RequestDetails.type,
        location: city,
        rate_per_hrs: hrs_rate,
        rate_per_km: kms_rate,
      },
      chunk
    )
      .then((res) => {
        console.log(res);
        !res.data && message.error("No Drivers to show");

        setDrivers(res.data);
        totalChunk.current = res.totalChunks;
      })
      .catch((err) => {
        console.log(err);
      });
  }, [chunk, hrs_rate, kms_rate, rating, experience_years]);

  const Handle$OnClick$DriverComponent = (driver: any) => {
    dispatch(sessionActions.addSessionDriverID({ driver_id: driver._id }));
    dispatch(
      sessionActions.addSessionHourlyRate({
        hourly_rate: hourly_rate + driver.rate_per_hrs,
      })
    );
    dispatch(
      sessionActions.addSessionKmsRate({ kms_rate: kmr + driver.rate_per_km })
    );
    if (cab_id === "") {
      navigate("/cabs");
    } else {
      navigate("/maps");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${Background})`,
        backgroundPosition: "center",
      }}
      className="text-white h-screen"
    >
      <Navigator />
      <div className="">
        <div className="flex w-full justify-evenly p-6 text-black">
          <select
            className="cursor-pointer px-4 py-2 rounded-lg"
            onChange={(ev) => setrating(Number(ev.target.value))}
            name=""
          >
            <option value="">Select Rating</option>
            <option value="1">{">"}1</option>
            <option value="2">{">"}2</option>
            <option value="3">{">"}3</option>
            <option value="4">{">"}4</option>
          </select>
          <select
            className="cursor-pointer px-4 py-2 rounded-lg"
            onChange={(ev) => setexperience_years(Number(ev.target.value))}
            name=""
          >
            <option value="">Select Years Exp.</option>
            <option value="1">{">"}1</option>
            <option value="2">{">"}2</option>
            <option value="3">{">"}3</option>
            <option value="4">{">"}4</option>
            <option value="5">{">"}5</option>
          </select>
          <div
            className="bg-white cursor-pointer px-4 py-2 rounded-lg"
            onClick={() => sethrs_rate((hrs_rate) => !hrs_rate)}
          >
            {!hrs_rate
              ? "Hours Per Hour : High to Low"
              : "Hours Per Hour : Low to High"}
          </div>
          <div
            className="bg-white cursor-pointer px-4 py-2 rounded-lg"
            onClick={() => setkms_rate((kms_rate) => !kms_rate)}
          >
            {!kms_rate
              ? "Kilometer Per Hour : High to Low"
              : "Kilometer Per Hour : Low to High"}
          </div>
        </div>
      </div>
      <div className=" overflow-auto h-[70vh] flex gap-10 flex-wrap justify-center">
        {totalChunk.current !== 0 &&
          drivers.map((driver: any, id: any) => {
            return (
              <div
                onMouseEnter={() => setcid(id)}
                onMouseLeave={() => setcid(-1)}
                style={{
                  backgroundColor: "rgba(17, 25, 40, 0.20)",
                  backdropFilter: "blur(16px) saturate(200%)",
                }}
                className="cursor-pointer rounded-xl p-3 w-84"
                onClick={() => Handle$OnClick$DriverComponent(driver)}
              >
                <img className="w-56 h-48" src={driver.imageurl}></img>
                <div className="p-3 flex flex-col w-full justify-between">
                  <div>{driver.username}</div>
                  <Rate
                    className="text-sm"
                    allowHalf
                    defaultValue={driver.rating}
                  />
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
                {/* <div>{driver.rating}</div> */}
                {/* <div>{driver.experience_years}</div> */}
                {/* <div>{driver.age}</div> */}
                {/* <div>{driver.rate_per_hrs}</div> */}
                {/* <div>{driver.rate_per_km}</div> */}
              </div>
            );
          })}
      </div>
      <div className="absolute bottom-0 flex w-[98vw] p-4 justify-center">
        <Pagination
          onChange={(e) => setchunk(e)}
          className=" p-2 rounded-xl bg-white text-black w-fit"
          defaultCurrent={1}
          total={(totalChunk.current ?? 1) * 10}
        />
      </div>
    </div>
  );
};
