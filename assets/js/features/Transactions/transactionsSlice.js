import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import CONFIG from '../../app/config'

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    loading: 'idle',
    transactions: [],
  },
  reducers: {
    transactionsLoading(state) {
      if (state.loading === 'idle') {
        state.loading = 'pending'
      }
    },
    transactionsReceived(state, action) {
      if (state.loading === 'pending') state.transactions = action.payload
    },
  },
})

export const {
  transactionsLoading,
  transactionsReceived,
} = transactionsSlice.actions

export const updateTransaction = (transaction) => async (dispatch) => {
  dispatch(transactionsLoading())

  const transactionParsed = {
    ...transaction,
    value: parseFloat(transaction.value),
  }

  await axios({
    method: 'put',
    url: CONFIG.endpoint.transaction + transaction.id,
    data: transactionParsed,
  })

  dispatch(fetchTransactions())
}

export const fetchTransactions = () => async (dispatch) => {
  dispatch(transactionsLoading())
  const response = await axios(CONFIG.endpoint.transactions).catch((err) =>
    console.log(err)
  )
  dispatch(transactionsReceived(response.data['hydra:member']))
}

export const selectTransactions = (state) => state.transactions
export default transactionsSlice.reducer
