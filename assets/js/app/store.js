import { configureStore } from '@reduxjs/toolkit'
import categoriesReducer from '../features/Categories/categoriesSlice'
import transactionsReducer from '../features/Transactions/transactionsSlice'
import banksReducer from '../features/Banks/banksSlice'
import budgetsReducer from '../features/Budgets/budgetsSlice'

export default configureStore({
    reducer: {
        banks: banksReducer,
        budgets: budgetsReducer,
        categories: categoriesReducer,
        transactions: transactionsReducer,
    }
})