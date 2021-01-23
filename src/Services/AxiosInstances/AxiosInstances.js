import axios from "axios";
import Config from "../../config.json";

const AxiosInstances = axios.create({
  baseURL: Config.baseURL,
});

console.log("BaseUrl", Config.baseURL);

export default AxiosInstances;
