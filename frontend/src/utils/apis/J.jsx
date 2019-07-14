import Http from "../http";

class J {
  static getOperations = () => {
    const route = "/operations/";
    return Http.get(`${route}`).then(res => res.data);
  };

  static getSymbols = () => {
    const route = "/symbols/";
    return Http.get(`${route}`).then(res => res.data);
  };
}

export default J;
