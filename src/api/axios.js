import axios from "axios";

const instance = axios.create({
  baseURL: "https://631da481789612cd07ade901.mockapi.io/",
});

export default instance;
