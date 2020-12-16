import React, { useEffect } from 'react'
import axios from 'axios'

import CONFIG from '../config'
import TransactionsList from './TransactionsList'

export default ({ transactions, onSetTransactions }) => {
  useEffect(() => {
    if (transactions) return
    const fetchData = async () => {
      const payload = await axios(CONFIG.endpoint.transactions)
      onSetTransactions(payload.data['hydra:member'])
    }
    fetchData()
  }, [])

  return transactions && <TransactionsList transactions={transactions} />
}
