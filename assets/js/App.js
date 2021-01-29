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
import Header from './features/Header'
import Transactions from './features/Transactions/Transactions'
import Categories from './features/Categories/Categories'
import axios from 'axios'
import { DropzoneArea } from 'material-ui-dropzone'
import Navigation from './components/Navigation'

export default function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTransactions())
    dispatch(fetchCategories())
    dispatch(fetchBanks())
    dispatch(fetchBudgets())
    dispatch(fetchUser())
  }, [])

  const handleFileUpload = (file) => {
    if (!file.length) return
    const formData = new FormData()
    const bankId = 1

    formData.append('file', file[0])
    formData.append('bankId', bankId)

    axios
      .post('/statement', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        dispatch(fetchTransactions())
      })
      .catch((error) => {
        console.log(error.response.data.detail)
      })
  }

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
                <DropzoneArea onChange={handleFileUpload} />
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
