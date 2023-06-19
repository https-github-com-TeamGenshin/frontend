import { Splash } from './Pages/Splash';
import Home from './Pages/Home';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from './Pages/Login';
import { setBaseURL } from './API';
import { Register } from './Pages/Register';
import {ForgetPassword} from "./Pages/ForgetPassword/index"


function App() {

  setBaseURL()

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetpassword" element={<ForgetPassword />}/>
      </Routes>
    </Router>


  );
}

export default App;
