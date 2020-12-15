import React, { useState, useEffect } from "react"
import axios from "axios"
import Grid from "@material-ui/core/Grid"

import CONFIG from "../config"
import TransactionsList from "./TransactionsList"
import Header from "../Header"

export default () => {
  const [transactions, setTransactions] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const payload = await axios(CONFIG.endpoint.transactions)
      setTransactions(payload.data["hydra:member"])
    }
    fetchData()
  }, [])

  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        Sidebar
      </Grid>
      <Grid item xs={10}>
          <Header />
        <TransactionsList transactions={transactions} />
      </Grid>
    </Grid>
  )
}
