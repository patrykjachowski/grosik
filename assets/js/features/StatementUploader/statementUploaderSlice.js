import { createSlice } from '@reduxjs/toolkit'

export const statementUploaderSlice = createSlice({
  name: 'statement uploader',
  initialState: {
    active: false,
  },
  reducers: {
    toggleStatementUploader(state) {
      state.active = !state.active
    },
  },
})

export default statementUploaderSlice.reducer
export const { toggleStatementUploader } = statementUploaderSlice.actions

export const selectStatementUploaderStatus = (state) =>
  state.statementUploader.active
