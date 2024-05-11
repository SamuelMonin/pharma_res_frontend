import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLogin: false,
  selectedProduct: {},
  user: {},
  newAccount: {}
}

export const LoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    connected: (state) => {
      state.isLogin = true
    },
    unConnected: (state) => {
        state.isLogin = false
    },
    selectProduct : (state, action) => {
        state.selectedProduct = action.payload
    },
    setUser: (state, action) => {
        state.user = action.payload
    },
    setNewAccount: (state, action) => {
        state.newAccount = action.payload
    },
  },
})

export const { connected, unConnected, selectProduct, setUser, setNewAccount } = LoginSlice.actions

export default LoginSlice.reducer