import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { reset, goProductList } from '../redux/login';

export function Command() {
    
    const dispatch = useDispatch();

    const [adresse, setAdresse] = useState("");
    let totalPrice = 0;

    const cart = useSelector((state) => state.login.cart);
    const isLogin = useSelector((state) => state.login.isLogin);
    const user = useSelector((state) => state.login.user);

    const addItem = async () => {
        try {
            if (isLogin === true) {

                cart.forEach((product) => {
                    console.log("Produit ici : " + product.price)
                    console.log("Quantitée ici : " + product.quantity)
                    totalPrice += (product.price * product.quantity)
                    console.log(totalPrice)
                  });

                const newObj = {
                    date: new Date(),
                    cart: cart,
                    deliver: "",
                    totalPrice: totalPrice,
                    adress: adresse,
                    user: user
                };

                await axios.post('https://pharma-res-backend.onrender.com/api/commands/put-item', newObj);

                dispatch(reset())
                dispatch(goProductList())

            }
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
