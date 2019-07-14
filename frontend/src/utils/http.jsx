import axios from "axios";

// const url = "https://stock-market-brazil-backend.herokuapp.com";
const url = "http://localhost:8080";

class Http {
  static post = (route, body) => {
    return axios.post(this.getLink(route), body, this.getConfig(null));
  };

  static get = (route, params) => {
    return axios.get(this.getLink(route), this.getConfig(params));
  };

  static put = (route, body) => {
    return axios.put(this.getLink(route), body, this.getConfig(null));
  };

  static delete = route => {
    return axios.delete(this.getLink(route), this.getConfig(null));
  };

  static getLink(route) {
    return url + route;
  }

  static getConfig(params) {
    const config = { headers: params || {} };
    config.headers.token = localStorage.getItem("stock-market-token") || "";
    return config;
  }
}

export default Http;
