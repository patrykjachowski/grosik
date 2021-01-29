import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import CONFIG from '../../app/config'

export const banksSlice = createSlice({
  name: 'banks',
  initialState: {
    loading: 'idle',
    banks: [],
  },
  reducers: {
    banksLoading(state) {
      if (state.loading === 'idle') {
        state.loading = 'pending'
      }
    },
    banksReceived(state, action) {
      if (state.loading === 'pending') {
        state.banks = action.payload
        state.loading = 'idle'
      }
    },
  },
})

export const { banksLoading, banksReceived } = banksSlice.actions

export const fetchBanks = () => async (dispatch) => {
  dispatch(banksLoading())
  const response = await axios(CONFIG.endpoint.banks).catch((err) =>
    console.log(err)
  )
  dispatch(banksReceived(response.data['hydra:member']))
}

export const selectBanks = (state) => state.banks.banks
export default banksSlice.reducer
