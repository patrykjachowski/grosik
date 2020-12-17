import React, { useEffect } from 'react'
import axios from 'axios'
import {useDispatch, useSelector} from "react-redux";
import {selectTransactions, addTransactions} from "./transactionsSlice";
import CONFIG from '../config'
import TransactionsList from './TransactionsList'

export default () => {
  const transactions = useSelector(selectTransactions)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(transactions.length)
    if (transactions.length) return

    const fetchData = async () => {
      const payload = await axios(CONFIG.endpoint.transactions)
      dispatch(addTransactions(payload.data['hydra:member']))
    }
    fetchData()
  }, [])

  return <TransactionsList transactions={transactions} />
}
