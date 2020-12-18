import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import CONFIG from '../../features/config'

export const transactionsSlice = createSlice({
    name: 'transactions',
    initialState: {
        loading: 'idle',
        transactions: []
    },
    reducers: {
        transactionsLoading(state, action) {
            if (state.loading === 'idle') {
                state.loading = 'pending'
            }
        },
        transactionsReceived(state, action) {
            if (state.loading === 'pending')
                console.log(action.payload)
            state.transactions  = action.payload
        }
    },
    extraReducers: {
/*
        [fetchTransactions.fulfilled]: (state, action) => {
            console.log('Hello!')
            console.log(state)
            console.log(action)
/!*
            const { requestId } = action.meta
            if (state.loading === 'pending' && state.currentRequestId === requestId) {
                state.loading = 'idle'
                state.entities.push(action.payload)
                state.currentRequestId = undefined
            }
*!/
        },
*/
    }
})

/*
export const fetchTransactions = createAsyncThunk(
    'transactions/fetchAll',
    async () => {
        const response = await axios(CONFIG.endpoint.categories)
        return response.data
    }
)
*/
export const { transactionsLoading, transactionsReceived } = transactionsSlice.actions

export const fetchTransactions = () => async dispatch => {
    dispatch(transactionsLoading())
    const response = await axios(CONFIG.endpoint.transactions)
    dispatch(transactionsReceived(response.data['hydra:member']))
}



export const { addTransactions } = transactionsSlice.actions
export const selectTransactions = (state) => state.transactions
export default transactionsSlice.reducer

/*
export const transactionsSlice = createSlice({
    name: 'transactions',
    initialState: [],
    reducers: {
        addTransactions: (state, action) => {
            return action.payload
        },
        getTransactions: (state) => {
            return state
        }
    },
})

export const { addTransactions } = transactionsSlice.actions
export const selectTransactions = (state) => state.transactions
export default transactionsSlice.reducer

*/



//
// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import { userAPI } from './userAPI'
//
// // First, create the thunk
// const fetchUserById = createAsyncThunk(
//     'users/fetchByIdStatus',
//     async (userId, thunkAPI) => {
//         const response = await userAPI.fetchById(userId)
//         return response.data
//     }
// )
//
// // Then, handle actions in your reducers:
// const usersSlice = createSlice({
//     name: 'users',
//     initialState: { entities: [], loading: 'idle' },
//     reducers: {
//         // standard reducer logic, with auto-generated action types per reducer
//     },
//     extraReducers: {
//         // Add reducers for additional action types here, and handle loading state as needed
//         [fetchUserById.fulfilled]: (state, action) => {
//             // Add user to the state array
//             state.entities.push(action.payload)
//         }
//     }
// })
//
// // Later, dispatch the thunk as needed in the app
// dispatch(fetchUserById(123))