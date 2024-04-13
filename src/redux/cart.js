import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cart: [],
}

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
        const isProductAlreadyInCart = state.cart.find(product => product._id === action.payload._id);
        console.log("isProductAlreadyInCart : ", isProductAlreadyInCart)
        if(isProductAlreadyInCart) {
            const updatedCart = state.cart.map(product => {
                if (product._id === action.payload._id) {
                    return { ...product, quantity: product.quantity + action.payload.quantity };
                }
                return product;
            });
            state.cart = updatedCart
        } else {
            state.cart.push(action.payload);
        }
    },
  },
})

export const { addToCart } = CartSlice.actions

export default CartSlice.reducer