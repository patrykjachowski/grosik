import React from 'react'
import { Grid } from '@material-ui/core'
import Calendar from './Calendar/Calendar'
import BudgetInfo from './Budgets/BudgetInfo'
import { useSelector } from 'react-redux'
import { selectUser } from './User/userSlice'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

const Header = () => {
  const user = useSelector(selectUser)
  const totalBalance = user ? user.totalBalance : 0

  return (
    <AppBar color="default" position="static">
      <Toolbar style={{ padding: '20px' }}>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Calendar />
          </Grid>
          <Grid item xs={5} style={{ textAlign: 'center', display: 'flex' }}>
            <BudgetInfo />
          </Grid>
          <Grid
            item
            xs={3}
            style={{
              textAlign: 'right',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box m="auto 0">
              <Typography variant="h6">{totalBalance || '0'} PLN</Typography>
              <Typography>Total balance</Typography>
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Header
