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
    updateCategories(state, action) {
      state.categories = action.payload
    },
    deselectSubcategories(state) {
      state.categories = state.categories.map((category) => {
        return {
          ...category,
          subcategories: category.subcategories.map((subcategory) => ({
            ...subcategory,
            select: false,
          })),
        }
      })
    },
    toggleCategoryCollapse(state, action) {
      state.categories = state.categories.map((category) => {
        return category.id === action.payload
          ? {
              ...category,
              collapsed: !category.collapsed,
            }
          : category
      })
    },
    setErrorMessage(state, action) {
      state.errorMessage = action.payload
    },
    cleanErrorMessage(state) {
      state.errorMessage = ''
    },
  },
})

export const {
  categoriesLoading,
  categoriesReceived,
  updateCategories,
  addTransactions,
  setErrorMessage,
  cleanErrorMessage,
  deselectSubcategories,
  toggleCategoryCollapse,
} = categoriesSlice.actions

export default categoriesSlice.reducer

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

export const selectCategories = (state) => state.categories.categories
export const selectErrorMessage = (state) => state.categories.errorMessage
export const selectMarkedSubcategories = (state) => {
  const { categories } = state.categories

  return categories
    .map((category) => {
      const markedSubcategories = category.subcategories
        .filter((subcategory) => subcategory.select === true)
        .map((subcategory) => ({ ...subcategory, categoryId: category.id }))

      return markedSubcategories.length ? markedSubcategories : null
    })
    .filter((n) => n)
    .flat()
}
