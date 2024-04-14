import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { reset, goProductList } from '../redux/login';
import { resetCart } from '../redux/cart';

export function Command() {
    
    const dispatch = useDispatch();
    const [adresse, setAdresse] = useState("");
    const totalPrice = useSelector((state) => state.login.totalPrice);
    const cart = useSelector((state) => state.cart.cart);
    const user = useSelector((state) => state.login.user);

    const addItem = async () => {
        const userToken = localStorage.getItem('token');
        const headers = {
            'Authorization': `Bearer ${userToken}`
        };
        try {
            const newCommand = {
                date: new Date(),
                cart: cart,
                deliver: "",
                totalPrice: totalPrice,
                adress: adresse,
                user: user
            };
            await axios.post('http://localhost:5501/api/commands/put-item', newCommand, { headers: headers });
            dispatch(reset())
            dispatch(goProductList())
            dispatch(resetCart())
        } catch (err) {
        console.log(err);
    }
    }

    return (
        <div>
            <h1>Finaliser votre commande : </h1>
            <TextField
                id="outlined-basic"
                label="Adresse"
                variant="outlined"
                onChange={(e) => { setAdresse(e.target.value); }}
            />
            <Button variant="outlined" onClick={addItem}>
                Valider la commande
            </Button>
        </div>
    );
}
