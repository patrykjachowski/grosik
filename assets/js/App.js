import React, { useEffect, useState } from 'react'
import '../styles/app.css'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import {
    addCategories,
    selectCategories,
} from './features/Categories/categoriesSlice'
import {
    addTransactions,
    fetchTransactions,
    selectTransactions,
} from './features/Transactions/transactionsSlice'

import Grid from '@material-ui/core/Grid'
import Header from './features/Header'
import Transactions from './features/Transactions/Transactions'
import Categories from './features/Categories/Categories'

export default function App() {
    const categories = useSelector(selectCategories)
    const dispatch = useDispatch()
    const transactions = useSelector((state) => state.transactions)

    useEffect(() => {
        const fetchData = async () => {
            const transactionsPayload = await dispatch(fetchTransactions())
            // dispatch(fetchTransactions())

            // const categoriesPayload = await axios(CONFIG.endpoint.categories)
            // const transactionsPayload = await axios(
            //     CONFIG.endpoint.transactions
            // )
            //
            // dispatch(addCategories(categoriesPayload.data['hydra:member']))
            // dispatch(addTransactions(transactionsPayload.data['hydra:member']))
        }
        fetchData()
    }, [])

    /*
        useEffect(() => {
            const fetchData = async () => {
                const categoriesPayload = await axios(CONFIG.endpoint.categories)
                const transactionsPayload = await axios(
                    CONFIG.endpoint.transactions
                )

                dispatch(addCategories(categoriesPayload.data['hydra:member']))
                dispatch(addTransactions(transactionsPayload.data['hydra:member']))
            }
            fetchData()
        }, [])
    */

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
                                {/*<Transactions transactions={transactions} />*/}
                                <Transactions />
                            </Route>
                            <Route path="/">
                                <Categories categories={categories} />
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
