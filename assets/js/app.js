import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import "core-js/stable"
import "regenerator-runtime/runtime"
import Grid from "@material-ui/core/Grid"

import "../styles/app.css"
import Header from "./components/Header";
import Transactions from "./components/Transactions/"
import Categories from "./components/Categories/"

ReactDOM.render(
  <Router>
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <nav>
          <ul>
            <li>
              <Link to="/">Kategorie</Link>
            </li>
            <li>
              <Link to="/transactions">Transakcje</Link>
            </li>
            <li>
              <Link to="/report">Raport</Link>
            </li>
          </ul>
        </nav>
      </Grid>
      <Grid item xs={10}>
        <div>
            <Header />
            <hr/>
          <Switch>
            <Route path="/report">
              <Report />
            </Route>
            <Route path="/transactions">
              <Transactions />
            </Route>
            <Route path="/">
              <Categories />
            </Route>
          </Switch>
        </div>
      </Grid>
    </Grid>
  </Router>,
  document.getElementById("root")
)

function Report() {
  return <h2>Raport</h2>
}
