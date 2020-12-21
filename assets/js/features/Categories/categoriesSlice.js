import { createSlice } from '@reduxjs/toolkit'
import axios from "axios";
import CONFIG from "../../app/config";

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
            loading: 'idle',
            categories: []
    },
    reducers: {
        categoriesLoading(state, action) {
            if (state.loading === 'idle') {
                state.loading = 'pending'
            }
        },
        categoriesReceived(state, action) {
            if (state.loading === 'pending')
                state.categories  = action.payload
        }
    },
})

export const { categoriesLoading, categoriesReceived } = categoriesSlice.actions

export const fetchCategories = () => async dispatch => {
    dispatch(categoriesLoading())
    const response = await axios(CONFIG.endpoint.categories)
    dispatch(categoriesReceived(response.data['hydra:member']))
}

export const { addTransactions } = categoriesSlice.actions
export const selectCategories = (state) => state.categories
export default categoriesSlice.reducer

