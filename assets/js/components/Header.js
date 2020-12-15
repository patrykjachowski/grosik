import React, { useEffect, useState } from "react"
import { Grid } from "@material-ui/core"
import axios from "axios"
import Calendar from "./Calendar"
import CONFIG from "./config"

export default () => {
  const [user, setUser] = useState({ totalBalance: 0 })

  useEffect(() => {
    const fetchData = async () => {
      const payload = await axios(CONFIG.endpoint.currentUser)
      setUser(payload.data)
      console.log(payload)
    }
    fetchData()
  }, [])

  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <Calendar />
      </Grid>
      <Grid item xs={6}>
        <strong>Balance: {user.totalBalance}</strong>
      </Grid>
    </Grid>
  )
}
