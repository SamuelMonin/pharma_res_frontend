import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'
import Button from '@mui/material/Button';
import { reset, goLogin, goCommand } from '../redux/login';


export function Cart() {

    const dispatch = useDispatch()

    const cart = useSelector((state) => state.login.cart)
    const isLogin = useSelector((state) => state.login.isLogin)




    const handleValidation = () => {

        if(isLogin ===  true){

            dispatch(reset())
            dispatch(goCommand())

        }

        else {

            dispatch(reset())
            dispatch(goLogin())
            return (
                alert("Connectez-vous pour valider votre panier !")
            )

        }

    };

    return (
        <div>
            <h1>Votre panier : </h1>
            {cart.map((product) => (
                <div key={product.description}>
                    <p>{product.description}</p>
                    <p>{product.quantity}</p>
                    <p>{product.price}</p>
                </div>
            ))}
            <Button variant="outlined" onClick={()=>handleValidation()}>Valider votre panier</Button>
        </div>
    );
}