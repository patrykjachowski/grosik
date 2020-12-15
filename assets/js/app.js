import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import "core-js/stable"
import "regenerator-runtime/runtime"

import Transactions from "./components/Transactions/"
import "../styles/app.css"
import Grid from "@material-ui/core/Grid"
import Header from "./components/Header";

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

function Categories() {
  return <h2>Kategorie</h2>
}

function Report() {
  return <h2>Raport</h2>
}
