import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import CONFIG from '../../app/config'

export const budgetsSlice = createSlice({
  name: 'budgets',
  initialState: {
    loading: 'idle',
    budgets: [],
  },
  reducers: {
    budgetsLoading(state) {
      if (state.loading === 'idle') {
        state.loading = 'pending'
      }
    },
    budgetsReceived(state, action) {
      if (state.loading === 'pending') {
        state.budgets = action.payload
        state.loading = 'idle'
      }
    },
  },
})

export const { budgetsLoading, budgetsReceived } = budgetsSlice.actions

export const fetchBudgets = () => async (dispatch) => {
  dispatch(budgetsLoading())
  const response = await axios(CONFIG.endpoint.budgets)
  dispatch(budgetsReceived(response.data['hydra:member']))
}

export const selectBudgets = (state) => state.budgets.budgets
export default budgetsSlice.reducer
