import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Drawer } from "../../Components/Drawer";
import { get$verifyUserToken } from "../../API/Login";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../store/login-slice";
import { MenuOutlined } from "@ant-design/icons";
import { message } from "antd";
import logo from "../../Assets/logo.png";
import { Navigator } from "../../Components/Navigator";
import { CitiesAutoComplete } from "../../Components/Autocomplete/Cities";
import { sessionActions } from "../../store/session-slice";
import Background from "../../Assets/HomeBG.png";
import Driver from "../../Assets/HomeDriver.png";
import Cab from "../../Assets/HomeCar.png";

const Home = () => {
  const [city, setcity] = useState<string>("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { RequestDetails } = useSelector((state: any) => state.login);

  useEffect(() => {
    dispatch(loginAction.addCity({ city: city }));
  }, [city]);

  const Validate$TypeandCity = () => {
    if (RequestDetails.type === "") {
      message.error("Please Select Vehicle Type");
      return false;
    } else if (city === "") {
      message.error("Please Select City");
      return false;
    } else return true;
  };

  const Handle$Onchange$VechileType = (ev: any) => {
    dispatch(loginAction.addType({ type: ev.target.value }));
    dispatch(sessionActions.addSessionType({ type: ev.target.value }));
  };

  return (
    <div>
      <div className="absolute top-0 -z-10 blur-sm">
        <img
          className="h-screen w-screen overflow-hidden"
          src={Background}
        ></img>
      </div>
      <div className="">
        <Navigator />
        <div className=" p-6 flex gap-6 justify-around items-center">
          <select
            onChange={Handle$Onchange$VechileType}
            className=" cursor-pointer p-1 rounded w-[20vw] outline-none"
            name="Vehicle"
          >
            <option value="">Vehicle Type</option>
            <option value="two-wheeler">Two Wheeler</option>
            <option value="three-wheeler">Three Wheeler</option>
            <option value="four-wheeler">Four Wheeler</option>
          </select>
          <CitiesAutoComplete city={city} setcity={setcity} />
        </div>
        <div className="flex justify-evenly">
          <section className="flex flex-col items-center justify-center gap-3 w-full">
            <div className="bg-white rounded-2xl opacity-20 mt-20 w-96 h-[65vh] absolute -z-10"></div>

            <div className="py-7 flex items-center">
              <img src={Cab} className="border w-96 rounded-3xl"></img>
            </div>
            <div className="text-white text-xl text-center">
              Select Cabs <br />
              that suits your <br />
              interest and comfort <br />
            </div>
            <div
              onClick={() => {
                if (Validate$TypeandCity()) navigate("/cabs");
              }}
              className="cursor-pointer rounded-2xl bg-[#14224A] p-2 text-center font-bold w-[10vw] text-white"
            >
              Explore
            </div>
          </section>
          <section className="flex flex-col items-center justify-center gap-3 w-full">
            <div className="bg-white rounded-2xl opacity-20 mt-20 w-96 h-[65vh] absolute -z-10"></div>
            <div className=" py-7 flex items-center">
              <img src={Driver} className=" w-64 rounded-3xl"></img>
            </div>
            <div className="text-white text-xl text-center">
              Select Drivers <br />
              Who are professionals <br />
              and have years of experience <br />
            </div>
            <div
              onClick={() => {
                if (Validate$TypeandCity()) navigate("/drivers");
              }}
              className="cursor-pointer bg-[#14224A] p-2 text-center font-bold rounded-xl w-[10vw] text-white"
            >
              Explore
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
