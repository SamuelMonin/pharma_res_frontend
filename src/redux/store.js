import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter'
import loginReducer from './login'
import cartReducer from './cart'
import viewReducer from './view'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    login: loginReducer,
    cart: cartReducer,
    view: viewReducer
  },
})