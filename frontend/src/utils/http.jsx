import axios from "axios";
import { password } from "../assets/keys";

class Http {
  static post = (link, body) => {
    return axios.post(link, body, { headers: { password } });
  };

  static get = link => {
    return axios.get(link, { headers: { password } });
  };

  static put = (link, body) => {
    return axios.put(link, body, { headers: { password } });
  };

  static delete = link => {
    return axios.delete(link, { headers: { password } });
  };
}

export default Http;
