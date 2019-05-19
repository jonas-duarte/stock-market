import { alphaVantageKey } from "../../assets/keys";
import Http from "../http";

class AlphaVantage {
  static url = "https://www.alphavantage.co/";
  static key = alphaVantageKey;

  static getCurrentQuote = symbol => {
    const query = ["function=GLOBAL_QUOTE", `symbol=${symbol}.SAO`];
    return Http.get(this.urlBuilder(query));
  };

  static urlBuilder = query => {
    console.log(`${this.url}query?${query.join("&")}&apikey=${this.key}`);
    return `${this.url}query?${query.join("&")}&apikey=${this.key}`;
  };
}

export default AlphaVantage;
