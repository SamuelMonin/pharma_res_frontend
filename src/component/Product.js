import React from 'react';
import {Component, useEffect, useState} from 'react';
import axios from 'axios'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux'
import { reset, goCart } from '../redux/login'
import { addToCart } from '../redux/cart'


export default function Product() {

    const dispatch = useDispatch()
    const selectedProduct = useSelector((state) => state.login.selectedProduct)
    const[quantity, setQuantity] = useState(1);
    const addToCartAction = (quantity) => {
        const updatedSelectedProduct = { ...selectedProduct, quantity };
        dispatch(addToCart(updatedSelectedProduct));
        dispatch(reset());
        dispatch(goCart());
    }

    return(
        <div>
            <p>{selectedProduct.description}</p>
            <p>{selectedProduct.price}</p>
            <p>{selectedProduct.score}</p>
            <TextField id="outlined-basic" label="Quantitée" variant="outlined" 
                onChange={(e) => { setQuantity(parseInt(e.target.value))}}
            />
            <Button variant="outlined" onClick={() => addToCartAction(quantity)}>Ajouter au panier</Button>

        </div>
      )
}