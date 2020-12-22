import React, { useEffect} from 'react'
import '../styles/app.css'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import {
    fetchCategories,
    selectCategories,
} from './features/Categories/categoriesSlice'
import {
    fetchTransactions,
} from './features/Transactions/transactionsSlice'

import Grid from '@material-ui/core/Grid'
import Header from './features/Header'
import Transactions from './features/Transactions/Transactions'
import Categories from './features/Categories/Categories'

export default function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTransactions())
        dispatch(fetchCategories())
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

const Report = () => {
    return ' Report '
}
