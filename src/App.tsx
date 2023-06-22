import { Splash } from './Pages/Splash';
import Home from './Pages/Home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from './Pages/Login';
import { setBaseURL } from './API';
import { Register } from './Pages/Register';
import { ForgetPassword } from "./Pages/ForgetPassword/index"
import { Loader } from './Components/Loader';
import { CabLists } from './Pages/CabLists';
import { DriverLists } from './Pages/DriverLists';


function App() {

  setBaseURL()

  return (
    <Router>
      <Loader />
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/cablists" element={<CabLists />} />
        <Route path="/driverLists" element={<DriverLists />} />
      </Routes>
    </Router>


  );
}

export default App;
