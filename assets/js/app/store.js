import { configureStore } from '@reduxjs/toolkit'
import categoriesReducer from '../features/Categories/categoriesSlice'
import transactionsReducer from '../features/Transactions/transactionsSlice'

export default configureStore({
    reducer: {
        categories: categoriesReducer,
        transactions: transactionsReducer
    }
})