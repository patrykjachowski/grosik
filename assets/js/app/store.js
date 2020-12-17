import { configureStore } from '@reduxjs/toolkit'
import categoriesReducer from '../features/Categories/categoriesSlice'

export default configureStore({
    reducer: {
        categories: categoriesReducer
    }
})