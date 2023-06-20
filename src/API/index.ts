import axios from "axios"

export const setBaseURL = () => {
    axios.defaults.baseURL = 'http://192.168.1.11:5000/';
}