import React, { useEffect, useRef, useState } from 'react'
import { put$getCabs } from '../../../API/cabs'
import { Select, message } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { sessionActions } from '../../../store/session-slice'
import { useNavigate } from 'react-router-dom'
import { Navigator } from '../../../Components/Navigator'
import { Pagination } from 'antd';
import Background from "../../../Assets/background1.png"
import { Card } from './Card'

export const Cabs = () => {
  const [cabs, setcabs] = useState<any>([]);

  const [kms_rate, setkms_rate] = useState<boolean>(true);
  const [fuel_type, setfuel_type] = useState<string>("");
  const [colour, setcolour] = useState<string>("");
  const [hrs_rate, sethrs_rate] = useState<boolean>(true);
  const [chunk, setchunk] = useState<number>(1);
  const [cid, setcid] = useState<number>(0);

  const { city, RequestDetails } = useSelector((state: any) => state.login);
  const {
    driver_id,
    hourly_rate,
    kms_rate: kmr,
  } = useSelector((state: any) => state.session);

  const totalChunk = useRef<number | undefined>(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setchunk(1);
  }, [kms_rate, hrs_rate, fuel_type, colour])

  useEffect(() => {
    setcabs([]);
    const DataToSend = {
      location: city,
      type: RequestDetails.type,
      colour: colour,
      fuel_type: fuel_type,
      hrs_rate: hrs_rate,
      kms_rate: kms_rate,
    };

    // console.log(DataToSend);

    put$getCabs(DataToSend, chunk)
      .then((data) => {
        
        if (data.totalChunks === 0) {
          message.error("No cabs to show");
        }
        setcabs(data.data);
        console.log(data);
        totalChunk.current = data.totalChunks;
      })
      .catch((err) => console.log(err));
  }, [kms_rate, hrs_rate, chunk, fuel_type, colour]);

  const Handle$OnClick$CabComponent = (cab: any) => {
    // console.log(cab.model_name);
    dispatch(sessionActions.addSessionModelNo({ model_no: cab.model_no }));
    dispatch(
      sessionActions.addSessionModelName({ model_name: cab.model_name })
    );
    dispatch(sessionActions.addSessionCabID({ cab_id: cab._id }));
    dispatch(
      sessionActions.addSessionHourlyRate({
        hourly_rate: hourly_rate + cab.hrs_rate,
      })
    );
    dispatch(
      sessionActions.addSessionKmsRate({ kms_rate: kmr + cab.kms_rate })
    );

    if (driver_id === "") {
      navigate("/drivers");
    } else {
      navigate("/maps");
    }
  };

  return (
    <div style={{ backgroundImage: `url(${Background})`, backgroundPosition: "center" }} className='text-white h-screen'>
      <Navigator />
      <div className="flex w-full justify-evenly p-6 text-black">
        <select
          className="cursor-pointer px-4 py-2 rounded-lg"
          onChange={(ev) => setfuel_type(ev.target.value)}
          name=""
        >
          <option value="">Select Fuel Type</option>
          <option value="electric">Electric</option>
          <option value="cng">CNG</option>
          <option value="petrol">Petrol</option>
          <option value="diesel">Diesel</option>
        </select>
        <select
          className="cursor-pointer px-4 py-2 rounded-lg"
          onChange={(ev) => setcolour(ev.target.value)}
          name=""
        >
          <option value="">Select Color</option>
          <option value="Black">Black</option>
          <option value="White">White</option>
          <option value="Red">Red</option>
          <option value="Yellow">Yellow</option>
          <option value="Blue">Blue</option>
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
      <div className="overflow-auto h-[70vh] flex gap-10 flex-wrap justify-center">
        {totalChunk.current !== 0 &&
          cabs.map((cab: any, id: number) => {
            return (
              <>
                <Card cid={cid} id={id} cab={cab} setcid={setcid} Handler={Handle$OnClick$CabComponent} />
              </>
            );
          })}
      </div>
      <div className="absolute z-20  bottom-0 flex w-[98vw] p-4 justify-center">
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
