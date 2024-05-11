import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLogin: false,
  showLogin: false,
  showProduct: false,
  showProductList: true,
  showCreateAccount: false,
  showCart: false,
  showCommand: false,
  showCodeValidation: false,
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
    goLogin: (state) => {
        state.showLogin = true
    },
    goProduct: (state) => {
        state.showProduct = true
    },
    goProductList: (state) => {
        state.showProductList = true
    },
    goCreateAccount: (state) => {
        state.showCreateAccount = true
    },
    goCart: (state) => {
        state.showCart = true
    },
    goCommand: (state) => {
        state.showCommand = true
    },
    goCodeValidation: (state) => {
        state.showCodeValidation = true
    },
    reset: (state) => {
        state.showLogin = false
        state.showProduct = false
        state.showProductList = false
        state.showCreateAccount = false
        state.showCart = false
        state.showCommand = false
        state.showCodeValidation = false
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


export const { connected, unConnected, goLogin, goProduct, goProductList, goCreateAccount, goCart, goCommand, goCodeValidation, reset, selectProduct, setUser, setNewAccount } = LoginSlice.actions

export default LoginSlice.reducer