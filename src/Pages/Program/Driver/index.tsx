import React, { useEffect, useState, useRef } from "react";
import { put$getDrivers } from "../../../API/drivers";
import { useDispatch, useSelector } from "react-redux";
import { sessionActions } from "../../../store/session-slice";
import { useNavigate } from "react-router-dom";
import { Navigator } from "../../../Components/Navigator";
import { Pagination, message } from "antd";
import Background from "../../../Assets/background1.png";
import { Card } from "./Card";

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
    // console.log(city);
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
        // console.log(res);
        !res.data && message.error("No Drivers to show");

        setDrivers(res.data);
        totalChunk.current = res.totalChunks;
      })
      .catch((err) => {
        // console.log(err);
      });
  }, [chunk, hrs_rate, kms_rate, rating, experience_years]);

  const Handle$OnClick$DriverComponent = (driver: any) => {
    dispatch(sessionActions.addSessionDriverID({ driver_id: driver._id }));
    dispatch(sessionActions.addSessionDriverNo({ driver_no: driver.mobile_no }));
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
          drivers?.map((driver: any, id: any) => {
            return (
              <Card cid={cid} id= {id} setcid = {setcid} driver={ driver } Handler={ Handle$OnClick$DriverComponent } />
            );
          })}
      </div>
      <div className="absolute z-20 bottom-0 flex w-[98vw] p-4 justify-center">
        <Pagination
          onChange={(e) => setchunk(e)}
          className=" border-2 border-black p-2 rounded-xl bg-white text-black w-fit"
          defaultCurrent={1}
          total={(totalChunk.current ?? 1) * 10}
        />
      </div>
    </div>
  );
};
