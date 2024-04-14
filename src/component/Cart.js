import React from 'react'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import { reset, goLogin, goCommand, goCart } from '../redux/login';
import { deleteFromCart, updateTotalPrice } from '../redux/cart';


export function Cart() {

    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart.cart)
    const totalPrice = useSelector((state) => state.cart.totalPrice)
    const isLogin = useSelector((state) => state.login.isLogin)
    let numberProducts = 0;


    cart.forEach((product) => {
        numberProducts += product.quantity
        // totalPrice += product.price * product.quantity
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

    const deleteProduct = (index) => {
        dispatch(deleteFromCart(index))
        dispatch(updateTotalPrice())
    }

    return (
        <div>
            <h1>Votre panier : </h1>
            <Stack direction="row" spacing={2} sx={{ margin: '2%'}}>
                <Box sx={{ border: '1px solid #1976d2', marginTop: '2%', marginLeft: '2%', width: '75%' }}>
                    <Stack direction="row" spacing={30} sx={{ margin: '2%'}}>
                        <p>Produit : </p>
                        <p>Quantitée : </p>
                        <p>Prix : </p>
                    </Stack>
                    {  cart.map((product, index) => (
                        <Stack key={index} direction="row" spacing={30} sx={{ margin: '2%'}}>
                                <p>{product.description}</p>
                                <p>{product.quantity}</p>
                                <p>{product.price}</p>
                                <Stack direction="row">
                                    <IconButton>
                                        <UpdateIcon onClick={()=>console.log("Update")} />
                                    </IconButton>
                                    <IconButton>
                                        <DeleteIcon onClick={()=> deleteProduct(index) } />
                                    </IconButton>
                                </Stack>
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