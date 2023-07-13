import axios from "axios";

export const setBaseURL = () => {
  axios.defaults.baseURL = "http://192.168.76.189:5000/";
};
