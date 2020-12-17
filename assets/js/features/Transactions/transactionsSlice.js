import { createSlice } from '@reduxjs/toolkit'

export const transactionsSlice = createSlice({
    name: 'transactions',
    initialState: [],
    reducers: {
        addTransactions: (state, action) => {
            return action.payload
        },
    },
})

export const { addTransactions } = transactionsSlice.actions
export const selectTransactions = (state) => state.transactions
export default transactionsSlice.reducer
