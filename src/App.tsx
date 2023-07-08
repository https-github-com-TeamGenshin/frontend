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

// import { New } from './Components/Maps/New';
import { Request } from "./Pages/Requests";
function App() {
  setBaseURL();

  return (
    <Router>
      <Loader />
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/cabs" element={<Cabs />} />
        <Route path="/drivers" element={<Driver />} />
        <Route path="/maps" element={<Maps />} />
        <Route path="timeandkm" element={<TimeAndKm />} />
        <Route path="request" element={<Request />} />
      </Routes>
      <Drawer />
    </Router>
  );
}

export default App;
