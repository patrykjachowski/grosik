import { configureStore } from '@reduxjs/toolkit'
import categoriesReducer from '../features/Categories/categoriesSlice'
import transactionsReducer from '../features/Transactions/transactionsSlice'
import banksReducer from '../features/Banks/banksSlice'
import budgetsReducer from '../features/Budgets/budgetsSlice'
import userReducer from '../features/User/userSlice'
import calendarReducer from '../features/Calendar/calendarSlice'
import statementUploaderReducer from '../features/StatementUploader/statementUploaderSlice'

export default configureStore({
  reducer: {
    banks: banksReducer,
    budgets: budgetsReducer,
    calendar: calendarReducer,
    categories: categoriesReducer,
    statementUploader: statementUploaderReducer,
    transactions: transactionsReducer,
    user: userReducer,
  },
})
