import React, { Component } from "react";
import AlphaVantage from "../utils/apis/alphaVantage";
import { portifolio } from "../assets/config";
import { request } from "http";
// import "../assets/htmls/GOAU3.html";
import cheerio from "cheerio";
import Fundamentus from "../utils/apis/fundamentus";

class Companies extends Component {
  state = {
    alpha: null,
    fundamentus: null
  };

  async componentDidMount() {
    let alpha = [];
    for (let i = 0; i < portifolio.length; i++) {
      const response = await AlphaVantage.getCurrentQuote(portifolio[i]);
      alpha.push(response.data);
    }

    let fundamentus = await Fundamentus.getFundamentalistData("GOAU4");

    this.setState({ alpha, fundamentus });
  }

  // teste = () => {
  //   const $ = cheerio.load(
  //     "https://imasters.com.br/desenvolvimento/web-scraping-com-node-js-e-cheerio"
  //   );
  //   cheerio.
  //   console.log("CHEERIO", $.html());
  //   return $.html();
  // };

  render() {
    return (
      <div>
        {JSON.stringify(this.state, null, 2)
          .split("\n")
          .map(l => (
            <div>{l}</div>
          ))}
        {/* {this.teste()} */}
      </div>
    );
  }
}

export default Companies;
