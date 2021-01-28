import React from 'react'
import { Grid } from '@material-ui/core'
import Calendar from './Calendar/Calendar'
import Budgets from './Budgets/Budgets'
import { useSelector } from 'react-redux'
import { selectUser } from './User/userSlice'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

export default () => {
    const user = useSelector(selectUser)
    const totalBalance = user ? user.totalBalance : 0

    const renderBalanceInfo = () => {
        return totalBalance > 0 ? (
            <span className="success">To be budgeted</span>
        ) : (
            <span className="alarm">Overspent!</span>
        )
    }

    return (
        <AppBar color="default" position="static" >
            <Toolbar style={{'padding': '20px'}}>
                <Grid container spacing={1}>
                    <Grid item xs={4}>
                        <Calendar />
                    </Grid>
                    <Grid item xs={5} style={{ textAlign: 'center' }}>
                        <Budgets />
                    </Grid>
                    <Grid item xs={3} style={{ textAlign: 'right' }}>
                        <Typography variant="h6">{totalBalance || '0'} PLN</Typography>
                        <Typography>Total balance</Typography>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
