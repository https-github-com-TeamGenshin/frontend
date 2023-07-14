import React from "react";
import logo from "../../Assets/logo.png";
import { MenuOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { utilsActions } from "../../store/utils-slice";
import { Link } from "react-router-dom";

export const Navigator = () => {
  const dispatch = useDispatch();
  const role = useSelector((state: any) => state.login.role);

  return (
    <div className="flex items-center py-3 px-6 gap-6 bg-slate-800 text-white">
      <MenuOutlined
        className="text-white text-xl"
        onClick={() => {
          const drawerElement = document.getElementById("drawer");
          if (drawerElement) {
            drawerElement.classList.remove("hidden");

            drawerElement.classList.add("drawer-width");
          }

          setTimeout(() => {
            const insideElement = document.getElementById("inside-content");
            if (insideElement) {
              insideElement.classList.remove("hidden");
            }
            dispatch(utilsActions.toggleDrawer({ showDrawer: 1 }));
          }, 1000);
        }}
      />

      <img className="w-28" src={logo}></img>
      <div className="flex w-full justify-center gap-28">
        {role === "user" && (
          <>
            <Link to="/home" className="text-2xl">
              Home
            </Link>
            <Link to="/requests" className="text-2xl">
              Requests
            </Link>
            <Link to="/history" className="text-2xl">
              History
            </Link>
          </>
        )}
        {role === "driver" && (
          <>
            <Link to="/driverhome" className="text-2xl">
              Home
            </Link>
            <Link to="/driverpending" className="text-2xl">
              Pending
            </Link>
            <Link to="/driveraccepted" className="text-2xl">
              Accepted
            </Link>
            <Link to="/driverupdate" className="text-2xl">
              Update Details
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
