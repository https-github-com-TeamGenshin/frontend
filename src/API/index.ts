import axios from "axios";

export const setBaseURL = () => {
  axios.defaults.baseURL = "http://192.168.0.102:5000/";
};
