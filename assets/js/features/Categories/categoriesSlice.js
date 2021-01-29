import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import CONFIG from '../../app/config'
import { fetchTransactions } from '../Transactions/transactionsSlice'
import { fetchBudgets } from '../Budgets/budgetsSlice'

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    loading: 'idle',
    categories: [],
    errorMessage: '',
  },
  reducers: {
    categoriesLoading(state) {
      if (state.loading === 'idle') {
        state.loading = 'pending'
      }
    },
    categoriesReceived(state, action) {
      if (state.loading === 'pending') {
        state.categories = action.payload
        state.loading = 'idle'
      }
    },
    setErrorMessage(state, action) {
      state.errorMessage = action.payload
    },
    cleanErrorMessage(state) {
      state.errorMessage = ''
    },
  },
})

export const { categoriesLoading, categoriesReceived } = categoriesSlice.actions

export const createSubcategory = (categoryId) => async (dispatch) => {
  dispatch(categoriesLoading())

  await axios({
    method: 'post',
    url: CONFIG.endpoint.category + categoryId + '/subcategories/',
  })

  dispatch(fetchCategories())
  dispatch(fetchTransactions())
}

export const createCategory = () => async (dispatch) => {
  dispatch(categoriesLoading())

  await axios({
    method: 'post',
    url: CONFIG.endpoint.categories,
    data: {
      name: 'New category',
      category: '/api/categories/',
    },
  })

  dispatch(fetchCategories())
  dispatch(fetchTransactions())
}

export const deleteCategory = (categoryId) => async (dispatch) => {
  dispatch(categoriesLoading())

  await axios({
    method: 'delete',
    url: CONFIG.endpoint.category + categoryId,
  })
    .then(() => {
      dispatch(fetchCategories())
      dispatch(fetchTransactions())
    })
    .catch((error) => {
      if (error.response.status === 500) {
        dispatch(setErrorMessage('Przenieś lub usuń pozostałe kategorie'))
      }
    })
}

export const update = (changedElement) => async (dispatch) => {
  dispatch(categoriesLoading())
  const elementType = changedElement.type

  await axios({
    method: 'patch',
    url: CONFIG.endpoint[elementType] + changedElement.id,
    data: changedElement,
  })

  dispatch(fetchCategories())
  dispatch(fetchTransactions())
  dispatch(fetchBudgets())
}

export const deleteSubcategories = (subcategories) => async (dispatch) => {
  dispatch(categoriesLoading())

  for (let subcategory of subcategories) {
    await axios({
      method: 'delete',
      url: CONFIG.endpoint.subcategory + subcategory.id,
    })
      .then(() => {
        dispatch(fetchCategories())
        dispatch(fetchTransactions())
      })
      .catch((error) => {
        if (error) console.log(error)
      })
  }
}

export const fetchCategories = () => async (dispatch) => {
  dispatch(categoriesLoading())
  const response = await axios(CONFIG.endpoint.categories)
  dispatch(categoriesReceived(response.data['hydra:member']))
}

export const {
  addTransactions,
  setErrorMessage,
  cleanErrorMessage,
} = categoriesSlice.actions

export const selectCategories = (state) => state.categories.categories
export const selectErrorMessage = (state) => state.categories.errorMessage
export default categoriesSlice.reducer
