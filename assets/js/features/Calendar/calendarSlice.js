import { createSlice } from '@reduxjs/toolkit'
const currentDate = new Date().setHours(0, 0, 0)

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    date: currentDate,
  },
  reducers: {
    setDate(state, action) {
      state.date = action.payload
    },
  },
})

export const { setDate } = calendarSlice.actions
export const selectDate = (state) => state.calendar.date
export default calendarSlice.reducer
