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
// import { New } from './Components/Maps/New';
import { Request } from "./Pages/Requests";
import Role from "./Validator/UserRole";
function App() {
  setBaseURL();

  return (
    <Router>
      <Loader />
      <Routes>
        <Route
          path="/"
          element={
            <Role access="user">
              <Splash />
            </Role>
          }
        />
        <Route
          path="/home"
          element={
            <Role access="user">
              <Home />
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
            <Role access="user">
              <Driver />
            </Role>
          }
        />
        <Route
          path="/maps"
          element={
            <Role access="user">
              <Maps />
            </Role>
          }
        />
        <Route
          path="timeandkm"
          element={
            <Role access="user">
              <TimeAndKm />
            </Role>
          }
        />
        <Route
          path="/history"
          element={
            <Role access="user">
              <History />
            </Role>
          }
        />
        <Route
          path="/requests"
          element={
            <Role access="user">
              <Request />
            </Role>
          }
        />
        <Route path="/unauthorized" element={<>No Page Found</>} />
      </Routes>
      <Drawer />
    </Router>
  );
}

export default App;
