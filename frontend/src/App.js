import React from "react";

import { BrowserRouter, Route, Link } from "react-router-dom";

import Home from "./pages/home/";
import Companies from "./pages/companies/";
import Portifolio from "./pages/portifolio/";
import Operacoes from "./pages/operacoes/";
import { password } from "./assets/keys";

const routes = [
  { route: "/", label: "Home", component: Home },
  { route: "/companies", label: "Companies", component: Companies },
  { route: "/portifolio", label: "Portifolio", component: Portifolio },
  { route: "/operacoes", label: "Operações", component: Operacoes }
];

function App() {
  if (localStorage.getItem("stock-market-password") !== password) {
    return (
      <div>Coloque o password no local storage -> stock-market-password</div>
    );
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

export default App;
