import { createSlice } from '@reduxjs/toolkit'

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: [],
    reducers: {
        addCategories: (state, action) => {
            // const nextState = { ...state}
          return action.payload
        },
    },
})

export const { addCategories } = categoriesSlice.actions

export const selectCategories = state => state.categories;

export default categoriesSlice.reducer

/*
import { createSlice } from '@reduxjs/toolkit'

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        value: 0
    },
    reducers: {
        increment: state => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1
        },
        decrement: state => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        }
    }
})

export const { increment, decrement, incrementByAmount } = categoriesSlice.actions

export default categoriesSlice.reducer*/
