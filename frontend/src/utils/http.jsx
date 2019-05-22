import axios from "axios";

class Http {
  static post = (link, body) => {
    return axios.post(link, body);
  };

  static get = (link, params) => {
    return axios.get(link, params);
  };

  static put = (link, body) => {
    return axios.put(link, body);
  };

  static delete = link => {
    return axios.delete(link);
  };
}

export default Http;
