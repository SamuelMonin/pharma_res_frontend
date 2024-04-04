import React from 'react'
import {Component, useEffect, useState} from 'react';
import axios from 'axios'
import { TextField, Button  } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import { goLogin, reset } from '../redux/login'


export function CodeValidation() {

    const dispatch = useDispatch();
    const[code, setCode] = useState(0);
    const[error, setError] = useState("");
    const newAccount = useSelector((state) => state.login.newAccount);

    const handleValidation = async (data) => {
        try {
            const response = await axios.post('https://pharma-res-backend.onrender.com/api/users/put-item', data)
            dispatch(reset())
            dispatch(goLogin())
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                console.error('Erreur:', error.message);
            }
          }
      }

    return (
        <div>
            <h1>Veuillez saisir votre code reçu par mail pour valider la création de votre compte : </h1>
            <TextField id="outlined-basic" label="Code" variant="outlined"
                onChange={(e) => { setCode(e.target.value)}}
            />
            <Button variant="outlined" onClick={() => handleValidation({
                login: newAccount.login,
                password: newAccount.login,
                mail: newAccount.mail,
                code: code
            })
            }>
                Valider
            </Button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}