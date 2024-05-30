import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'

export const makeStore = () => {
    return configureStore({
        reducer: {
            user: userReducer
        }
    })
}