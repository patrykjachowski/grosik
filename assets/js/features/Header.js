import React from 'react'
import { Grid } from '@material-ui/core'
import Calendar from './Calendar/Calendar'
import Budgets from './Budgets/Budgets'
import { useSelector } from 'react-redux'
import { selectUser } from './User/userSlice'

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
        <Grid container spacing={1}>
            <Grid item xs={3}>
                <Calendar />
            </Grid>
            <Grid item xs={4} style={{ textAlign: 'center' }}>
                <Budgets />
            </Grid>
            <Grid item xs={5} style={{ textAlign: 'right' }}>
                <div>
                    <strong>{totalBalance || '0'}</strong>
                    <div>{renderBalanceInfo()}</div>
                </div>
                <div>
                    <small>Total Balance: {totalBalance || '0'}</small>
                </div>
            </Grid>
        </Grid>
    )
}
