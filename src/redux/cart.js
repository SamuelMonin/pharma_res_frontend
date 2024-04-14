import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cart: [],
    totalPrice: 0
}

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
        const productIndex = state.cart.findIndex(product => product._id === action.payload._id);
        if(productIndex >= 0) {
            const updatedProduct = {...state.cart[productIndex], quantity: state.cart[productIndex].quantity + action.payload.quantity};
            state.cart[productIndex] = updatedProduct;
        } else {
            state.cart.push(action.payload);
        }
    },
    deleteFromCart: (state, action) => {
        const updatedCart = [...state.cart.slice(0, action.payload), ...state.cart.slice(action.payload + 1)];
        state.cart = updatedCart
    },
    updateTotalPrice: (state) => {
        let newTotalPrice = 0
        state.cart.forEach( product =>
            newTotalPrice += product.quantity * product.price )
        state.totalPrice = newTotalPrice
    },
    resetCart: (state) => {
        state.cart = []
    }
    }
  },
)

export const { addToCart, deleteFromCart, updateTotalPrice, resetCart } = CartSlice.actions

export default CartSlice.reducer