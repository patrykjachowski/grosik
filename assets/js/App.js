import React, { useEffect } from 'react'
import '../styles/app.css'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import {
    fetchCategories,
    selectCategories,
} from './features/Categories/categoriesSlice'
import { fetchTransactions } from './features/Transactions/transactionsSlice'
import { fetchBanks, selectBanks } from './features/Banks/banksSlice'

import Grid from '@material-ui/core/Grid'
import Header from './features/Header'
import Transactions from './features/Transactions/Transactions'
import Categories from './features/Categories/Categories'
import Banks from './features/Banks/Banks'

export default function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTransactions())
        dispatch(fetchCategories())
        dispatch(fetchBanks())
    }, [])

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
                        </ul>
                    </nav>
                    <hr />
                    <Banks />
                </Grid>
                <Grid item xs={10}>
                    <div>
                        <Header />
                        <hr />
                        <Switch>
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
        </Router>
    )
}
