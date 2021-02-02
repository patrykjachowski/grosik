import React from 'react'
import ReactDOM from 'react-dom'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import App from './App'
import store from './app/store'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core'
import purple from '@material-ui/core/colors/purple'
import green from '@material-ui/core/colors/green'
import CssBaseline from '@material-ui/core/CssBaseline'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
  overrides: {
    MuiTableContainer: {
      root: {
        marginBottom: '10px',
      },
    },
    MuiTableHead: {
      root: {
        backgroundColor: 'gray',
        // paddingTop: 4,
        // paddingBottom: 4,
        // '&:last-child': {
        //   paddingRight: 5,
        // },
      },
    },
  },
})

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
)
