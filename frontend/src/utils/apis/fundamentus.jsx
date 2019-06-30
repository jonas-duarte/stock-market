import Http from "../http";

class Fundamentus {
  static url = "https://stock-market-brazil-backend.herokuapp.com/fundamentus/";

  static getFundamentalistData = symbol => {
    return Http.get(`${this.url}${symbol}`);
  };
}

export default Fundamentus;
