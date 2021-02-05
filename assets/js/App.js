import React, { useEffect } from 'react'
import '../styles/app.css'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { Switch } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { fetchCategories } from './features/Categories/categoriesSlice'
import { fetchTransactions } from './features/Transactions/transactionsSlice'
import { fetchBanks } from './features/Banks/banksSlice'
import { fetchBudgets } from './features/Budgets/budgetsSlice'
import { fetchUser } from './features/User/userSlice'

import Grid from '@material-ui/core/Grid'
import Header from './components/Header'
import Transactions from './features/Transactions/Transactions'
import Categories from './features/Categories/Categories'
import Navigation from './components/Navigation'
import StatementUploader from './features/StatementUploader/StatementUploader'

export default function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTransactions())
    dispatch(fetchCategories())
    dispatch(fetchBanks())
    dispatch(fetchBudgets())
    dispatch(fetchUser())
  }, [])

  return (
    <Router>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Navigation />
          {/*<Banks />*/}
        </Grid>
        <Grid item xs={10}>
          <div>
            <Header />
            <hr />
            <Switch>
              <Route path="/transactions">
                <StatementUploader />
                <Transactions />
              </Route>
              <Route path="/">
                <Categories />
              </Route>
            </Switch>
          </div>
        </Grid>
      </Grid>
    </Router>
  )
}
