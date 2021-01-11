import React, { useEffect, useState } from 'react'
import { Grid } from '@material-ui/core'
import axios from 'axios'
import Calendar from './Calendar'
import CONFIG from '../app/config'

export default () => {
    const [user, setUser] = useState({ totalBalance: 0 })

    useEffect(() => {
        const fetchData = async () => {
            const payload = await axios(CONFIG.endpoint.currentUser)
            setUser(payload.data)
        }
        fetchData()
    }, [])

    const renderBalanceInfo = () => {
        return user.totalBalance > 0 ? (
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
            <Grid item xs={9} style={{ textAlign: 'right' }}>
                <strong>Balance: {user.totalBalance || '0'}</strong>
                <div>{renderBalanceInfo()}</div>
            </Grid>
        </Grid>
    )
}
