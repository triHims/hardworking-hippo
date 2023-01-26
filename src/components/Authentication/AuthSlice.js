import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    isLoading: false,
    authUser: null
}

export const authSlice = createSlice({
    name: 'authentication',
    initialState: initialState,
    reducers: {
        loading: _ => ({
            isLoading: true,
            authUser: null
        }),
        unauthorized: _ => ({
            isLoading: false,
            authUser: null
        }),
        authorized: (_, action) => { 
            
            return {
            isLoading: false,
            authUser: action.payload
        } },

        emailNotConfirm: (_,action) => ({
            isLoading: false,
            authUser: action.payload
        }),
    }
})


export const selectAuthenticationState = locState => locState.authentication
