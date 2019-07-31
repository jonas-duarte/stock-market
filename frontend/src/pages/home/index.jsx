import React, { Component } from "react";

class Home extends Component {
  state = {};
  render() {
    return (
      <div>
        <h1>Developed by: Jonas Rafael Duarte dos Santos</h1>
        <h1>
          Git:{" "}
          <a href="https://github.com/Fohtorme/stock-market">
            https://github.com/Fohtorme/stock-market
          </a>
        </h1>
        <br />
        <div>
          <h1>Next steps:</h1>
          <h2>* Advanced filters</h2>
          <h2>* Customizable fields in grid</h2>
          <h2>* Crud operations</h2>
          <h2>* Save grid layout in data the base</h2>
          <h2>* Operations simulator with unlimited money</h2>
          <h2>* Operations simulator with limited money (like a game)</h2>
        </div>
      </div>
    );
  }
}

export default Home;
