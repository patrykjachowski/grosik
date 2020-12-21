import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import CONFIG from '../../app/config'

export const transactionsSlice = createSlice({
    name: 'transactions',
    initialState: {
        loading: 'idle',
        transactions: []
    },
    reducers: {
        transactionsLoading(state, action) {
            if (state.loading === 'idle') {
                state.loading = 'pending'
            }
        },
        transactionsReceived(state, action) {
            if (state.loading === 'pending')
            state.transactions  = action.payload
        }
    },
})

export const { transactionsLoading, transactionsReceived } = transactionsSlice.actions

export const fetchTransactions = () => async dispatch => {
    dispatch(transactionsLoading())
    const response = await axios(CONFIG.endpoint.transactions)
    dispatch(transactionsReceived(response.data['hydra:member']))
}

export const { addTransactions } = transactionsSlice.actions
export const selectTransactions = (state) => state.transactions
export default transactionsSlice.reducer

