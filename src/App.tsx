import { Splash } from "./Pages/Splash";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./Pages/Login";
import { setBaseURL } from "./API";
import { Register } from "./Pages/Register";
import { ForgetPassword } from "./Pages/ForgetPassword/index";
import { Loader } from "./Components/Loader";
import { Cabs } from "./Pages/Program/Cabs";
import { Driver } from "./Pages/Program/Driver";
import Maps from "./Components/Maps";
import { TimeAndKm } from "./Pages/Program/TimesAndKm";
import { Drawer } from "./Components/Drawer";
import { History } from "./Pages/History";
import { Unauthorized } from "./Pages/Unauthorized";
// import Requests
// import { New } from './Components/Maps/New';
import { Request } from "./Pages/Requests";
import { AdminHome } from "./Pages/Admin/Home/AdminHome";
import { CreateCab } from "./Pages/Admin/CreateCab/CreateCab";
import { DriverHome } from "./Pages/DriverProgram/Home";
import { Driveraccepted } from "./Pages/DriverProgram/Accepted";
import { DriverPending } from "./Pages/DriverProgram/Pending";
import { DriverUpdate } from "./Pages/DriverProgram/Update";
import { DeleteCab } from "./Pages/Admin/DeleteCabs/DeleteCab";
import Role from "./Validator/UserRole";
import { DeleteDriver } from "./Pages/Admin/DeleteDrivers/DeleteDriver";
import { UpdateCabs } from "./Pages/Admin/UpdateCabs/UpdateCabs";
import { EditCabDetails } from "./Pages/Admin/UpdateCabs/EditCabDetails";
import { DeleteCabFunction } from "./Pages/Admin/DeleteCabs/DeleteCabFunction";

function App() {
  setBaseURL();

  return (
    <Router>
      <Loader />
      <Routes>
        <Route
          path="/"
          element={
              <Splash />
          }
        />
        <Route
          path="/driverhome"
          element={
              <Role access="driver" >
              <DriverHome />
            </Role>
          }
        />
        <Route
          path="/driverpending"
          element={
              <Role access="driver" >
              <DriverPending />
            </Role>
          }
        />
        <Route
          path="/driveraccepted"
          element={
              <Role access="driver" >
              <Driveraccepted />
            </Role>
          }
        />
        <Route
          path="/driverupdate"
          element={
              <Role access="driver" >
              <DriverUpdate />
            </Role>
          }
        />
        <Route
          path="/home"
          element={
            <Role access="user" >
              <Home />
            </Role>
          }
        />
        <Route
          path="/adminhome"
          element={
            <Role access="Admin" >
              <AdminHome />
            </Role>
          }
        />
        <Route
          path="/editcabdetails"
          element={
            <Role access="Admin" >
              <EditCabDetails />
            </Role>
          }
        />
        <Route
          path="/updateCabs"
          element={
            <Role access="Admin" >
              <UpdateCabs />
            </Role>
          }
        />
        <Route
          path="/admindeletecab"
          element={
            <Role access="Admin" >
              <DeleteCab />
            </Role>
          }
        />
        <Route
          path="/admindeletedriver"
          element={
            <Role access="Admin" >
              <DeleteDriver />
            </Role>
          }
        />
        <Route
          path="/admindeletecabfunction"
          element={
            <Role access="Admin" >
              <DeleteCabFunction />
            </Role>
          }
        />
        <Route
          path="/createcab"
          element={
            <Role access="Admin"  >
              <CreateCab />
            </Role>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route
          path="/cabs"
          element={
            <Role access="user">
              <Cabs />
            </Role>
          }
        />
        <Route
          path="/drivers"
          element={
            <Role access="user" >
              <Driver />
            </Role>
          }
        />
        <Route
          path="/maps"
          element={
            <Role access="user"  >
              <Maps />
            </Role>
          }
        />
        
        <Route
          path="timeandkm"
          element={
            <Role access="user"  >
              <TimeAndKm />
            </Role>
          }
        />
        <Route
          path="/history"
          element={
              <History />
          }
        />
        <Route
          path="/requests"
          element={
              <Request />
          }
        />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
      <Drawer />
    </Router>
  );
}

export default App;
