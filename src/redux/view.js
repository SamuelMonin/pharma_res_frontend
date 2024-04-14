import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  showLogin: false,
  showProduct: false,
  showProductList: true,
  showCreateAccount: false,
  showCart: false,
  showCommand: false,
  showCodeValidation: false,
}

export const ViewSlice = createSlice({
  name: 'view',
  initialState,
  reducers: {
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
  },
})

export const { goLogin, goProduct, goProductList, goCreateAccount, goCart, goCommand, goCodeValidation, reset, selectProduct } = ViewSlice.actions

export default ViewSlice.reducer