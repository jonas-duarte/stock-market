import { alphaVantageKey } from "../../assets/keys";
import Http from "../http";

class Fundamentus {
  static url = "http://localhost:8080/fundamentus/";
  static key = alphaVantageKey;

  static getFundamentalistData = symbol => {
    return Http.get(`${this.url}${symbol}`);
  };
}

export default Fundamentus;
