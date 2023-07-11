import axios from "axios";

export const setBaseURL = () => {
  axios.defaults.baseURL = "http://192.168.0.108:5000/";
};
