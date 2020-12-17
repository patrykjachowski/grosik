import { createSlice } from '@reduxjs/toolkit'

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: [],
    reducers: {
        addCategories: (state, action) => {
            return action.payload
        },
    },
})

export const { addCategories } = categoriesSlice.actions
export const selectCategories = (state) => state.categories
export default categoriesSlice.reducer
