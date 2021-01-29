import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import CONFIG from '../../app/config'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: 'idle',
    user: null,
  },
  reducers: {
    userLoading(state) {
      if (state.loading === 'idle') {
        state.loading = 'pending'
      }
    },
    userReceived(state, action) {
      if (state.loading === 'pending') {
        state.user = action.payload
        state.loading = 'idle'
      }
    },
  },
})

export const { userLoading, userReceived } = userSlice.actions

export const fetchUser = () => async (dispatch) => {
  dispatch(userLoading())
  const response = await axios(CONFIG.endpoint.currentUser)
  dispatch(userReceived(response.data))
}

export const selectUser = (state) => state.user.user
export default userSlice.reducer
