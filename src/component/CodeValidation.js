import React from 'react'
import {Component, useEffect, useState} from 'react';
import axios from 'axios'
import { TextField, Button  } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import { goLogin, reset } from '../redux/login'


export function CodeValidation() {

    const dispatch = useDispatch();

    const[code, setCode] = useState(0);

    const newAccount = useSelector((state) => state.login.newAccount);

    console.log("newAccount : ", newAccount);

    const handleValidation = async (data) => {
        try {
            const response = await axios.post('http://localhost:5501/api/users/put-item', data)
            console.log("response.data : ", response.data)
            console.log("response.data.isValidCode : ", response.data.isValidCode)

            if(response.data.isValidCode === true) {
                dispatch(reset())
                dispatch(goLogin())
                return (
                    alert("Votre compte : '" + newAccount.login + "' a été créé.")
                )
            }
            else {
                return (
                    alert("Mauvais mot de passe.")
                )
            }

        } catch (err) {
            console.log(err);
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

        </div>
    );
}