import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Paper from '@material-ui/core/Paper'
import { useHistory, useLocation } from 'react-router-dom'

const Navigation = () => {
  const history = useHistory()
  const location = useLocation()

  return (
    <Paper>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem
          button
          selected={location.pathname === '/'}
          onClick={() => history.push('/')}
        >
          Kategorie
        </ListItem>
        <ListItem
          button
          selected={location.pathname === '/transactions'}
          onClick={() => history.push('/transactions')}
        >
          Transakcje
        </ListItem>
      </List>
    </Paper>
  )
}

export default Navigation
