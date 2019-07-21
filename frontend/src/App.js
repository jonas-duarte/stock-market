import React, { Component } from "react";

import { BrowserRouter, Route, Link } from "react-router-dom";

import Home from "./pages/home/";
import Companies from "./pages/companies/";
import Portifolio from "./pages/portifolio/";
import Operacoes from "./pages/operacoes/";
import Login from "./pages/login";

const routes = [
  { route: "/", label: "Home", component: Home },
  { route: "/companies", label: "Companies", component: Companies },
  { route: "/portifolio", label: "Portifolio", component: Portifolio },
  { route: "/operacoes", label: "Operações", component: Operacoes }
];

class App extends Component {
  state = {
    token: localStorage.getItem("stock-market-token")
  };

  handleUpdate = () => {
    this.setState({ token: localStorage.getItem("stock-market-token") });
  };

  render() {
    if (!this.state.token) {
      return <Login update={this.handleUpdate} />;
    }
    return (
      <BrowserRouter>
        <div>
          {routes.map(r => (
            <Link style={{ paddingLeft: "1em" }} to={r.route}>
              {r.label}
            </Link>
          ))}
        </div>
        {routes.map(r => (
          <Route exact path={r.route} component={r.component} />
        ))}
      </BrowserRouter>
    );
  }
}

export default App;
