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
import { DropzoneArea } from 'material-ui-dropzone'
import axios from 'axios'

export default function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTransactions())
        dispatch(fetchCategories())
        dispatch(fetchBanks())
    }, [])

    const handleFileUpload = (file) => {
        if (!file.length) return
        console.log(file)
        const formData = new FormData()
        formData.append('file', file[0])

        axios
            .post('/statement', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .catch(function (error) {
                console.log(error.response.data.detail)
            })
    }

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
