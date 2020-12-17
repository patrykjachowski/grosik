import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import Categories from './features/Categories/Categories'
import '../styles/app.css'
import Header from './features/Header'
import Transactions from './features/Transactions/'

export default function App() {
  // const [categories, setCategories] = useState(null)
  const [transactions, setTransactions] = useState(null)

  return (
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
            <hr />
            <Switch>
              <Route path="/report">
                <Report />
              </Route>
              <Route path="/transactions">
                <Transactions
                  transactions={transactions}
                  onSetTransactions={(newTransactions) =>
                    setTransactions(newTransactions)
                  }
                />
              </Route>
              <Route path="/">
                <Categories
/*
                  categories={categories}
                  onSetCategories={(newCategories) =>
                    setCategories(newCategories)
                  }
*/
                />
{/*
                <Categories
                  categories={categories}
                  onSetCategories={(newCategories) =>
                    setCategories(newCategories)
                  }
                />
*/}
              </Route>
            </Switch>
          </div>
        </Grid>
      </Grid>
    </Router>
  )
}

const Report = () => {
  return ' Report '
}
