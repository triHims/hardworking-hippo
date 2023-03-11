import {configureStore} from '@reduxjs/toolkit'
import {authSlice} from './Authentication/AuthSlice.js'
export default configureStore ({
    reducer: {
        authentication: authSlice.reducer
    }
})
