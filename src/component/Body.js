import * as React from 'react';
import Login from './Login';
import ProductList from './ProductList';
import CreateAccount from './CreateAccount';
import Product from './Product';
import { Cart } from './Cart';
import { Command } from './Command';
import { CodeValidation } from './CodeValidation';

import { useSelector, useDispatch } from 'react-redux'

export default function Body() {

    const showLogin = useSelector((state) => state.view.showLogin)
    const showProduct = useSelector((state) => state.view.showProduct)
    const showProductList = useSelector((state) => state.view.showProductList)
    const showCreateAccount = useSelector((state) => state.view.showCreateAccount)
    const showCart = useSelector((state) => state.view.showCart)
    const showCommand = useSelector((state) => state.view.showCommand)
    const showCodeValidation = useSelector((state) => state.view.showCodeValidation)

    if (showLogin === true) {
        return (
            <Login/>
        )
    }

    if (showProduct === true) {
        return (
            <Product/>
        )
    }

    if (showProductList === true) {
        return (
            <ProductList/>
        )
    }

    if (showCreateAccount === true) {
        return (
            <CreateAccount/>
        )
    }

    if (showCart === true) {
        return (
            <Cart/>
        )
    }

    if (showCommand === true) {
        return (
            <Command/>
        )
    }

    if (showCodeValidation === true) {
        return (
            <CodeValidation/>
        )
    }

}