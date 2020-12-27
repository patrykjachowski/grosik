import { configureStore } from '@reduxjs/toolkit'
import categoriesReducer from '../features/Categories/categoriesSlice'
import transactionsReducer from '../features/Transactions/transactionsSlice'
import banksReducer from '../features/Banks/banksSlice'

export default configureStore({
    reducer: {
        categories: categoriesReducer,
        transactions: transactionsReducer,
        banks: banksReducer,
    }
})