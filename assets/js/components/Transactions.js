import React, {useState, useEffect} from 'react'
import Container from '@material-ui/core/Container';
import Grid from "@material-ui/core/Grid";
import axios from 'axios';


export default () => {
    const [ transactions, setTransactions ] = useState({ transactions: [] })

    return (
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    Sidebar
                </Grid>
                <Grid item xs={9}>
                    Transactions!
                </Grid>
            </Grid>
    )
}