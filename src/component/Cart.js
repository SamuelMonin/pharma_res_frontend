import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { reset, goLogin, goCommand } from '../redux/login';


export function Cart() {

    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart.cart)
    const isLogin = useSelector((state) => state.login.isLogin)
    let totalPrice = 0;
    let numberProducts = 0;
    cart.forEach((product) => {
        numberProducts += product.quantity
        totalPrice += product.price * product.quantity
      });

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
            <Stack direction="row" spacing={2} sx={{ margin: '2%'}}>
                <Box sx={{ border: '1px solid #1976d2', marginTop: '2%', marginLeft: '2%', width: '75%' }}>
                <Stack direction="row" spacing={20} sx={{ margin: '2%'}}>
                    <p>Produit : </p>
                    <p>Quantitée : </p>
                    <p>Prix : </p>
                </Stack>
                    {cart.map((product) => (
                        <Stack key={product.description} direction="row" spacing={20} sx={{ margin: '2%'}}>
                                <p>{product.description}</p>
                                <p>{product.quantity}</p>
                                <p>{product.price}</p>
                        </Stack>
                    ))}
                    <p>Montant total (pour {numberProducts} produits) : {totalPrice}</p>
                </Box>
                <Box>
                    <p>Total (pour {numberProducts} produits) : {totalPrice}</p>
                    <Button variant="outlined" onClick={()=>handleValidation()}>Valider votre panier</Button>
                </Box>
            </Stack>
        </div>
    );
}