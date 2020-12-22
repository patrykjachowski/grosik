import {createSlice} from '@reduxjs/toolkit'
import axios from "axios";
import CONFIG from "../../app/config";
import {fetchTransactions} from "../Transactions/transactionsSlice";

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
                state.categories = action.payload
        }
    },
})

export const {categoriesLoading, categoriesReceived} = categoriesSlice.actions

export const createSubcategory = categoryId => async (dispatch) => {
    console.log('/api/categories/' + categoryId)
    dispatch(categoriesLoading())

    await axios({
        method: 'post',
        url: CONFIG.endpoint.subcategories,
        data: {
            name: 'New subcategory',
            category: '/api/categories/' + categoryId
        }
    })

    dispatch(fetchCategories())
    dispatch(fetchTransactions())
}

export const update = (changedElement) => async (dispatch) => {
    dispatch(categoriesLoading())
    const elementType = changedElement.type

    await axios({
        method: 'put',
        url: CONFIG.endpoint[elementType] + changedElement.id,
        data: changedElement,
    })

    dispatch(fetchCategories())
    dispatch(fetchTransactions())
}

export const deleteSubcategories = subcategories => async (dispatch) => {
    dispatch(categoriesLoading())

    for (const subcategory of subcategories) {
        await axios({
            method: 'delete',
            url: CONFIG.endpoint.subcategory + subcategory.id,
        })
    }

    dispatch(fetchCategories())
    dispatch(fetchTransactions())
}

export const fetchCategories = () => async dispatch => {
    dispatch(categoriesLoading())
    const response = await axios(CONFIG.endpoint.categories)
    dispatch(categoriesReceived(response.data['hydra:member']))
}

export const {addTransactions} = categoriesSlice.actions
export const selectCategories = (state) => state.categories.categories
export default categoriesSlice.reducer

