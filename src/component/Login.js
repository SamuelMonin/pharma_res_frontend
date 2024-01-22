import React from 'react';
import {Component, useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios'

import { useSelector, useDispatch } from 'react-redux'
import { connected, goCreateAccount, goProductList, reset, setUser } from '../redux/login'


export default function Login() {


    const dispatch = useDispatch()

    const[login, setLogin] = useState("");
    const[password, setPassword] = useState("");
    const[users, setUsers] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:5501/api/users')
          .then(response => {
            console.log(response.data);
            setUsers(response.data);    
          })
          .catch(err => console.log(err));
      }, []);

    const handleValidation = () => {

        users.forEach((user) => {
            if (user.login === login && user.password === password) {
              dispatch(connected());
              dispatch(setUser(user));
              dispatch(reset())
              dispatch(goProductList())
            }
          });

    };

    const createAccount = () => {

        dispatch(reset())
        dispatch(goCreateAccount())

    }

    return (
        <div>
            <h1>Se connecter :</h1>

            <TextField id="outlined-basic" label="Login" variant="outlined" 
                onChange={(e) => { setLogin(e.target.value);}}
            />

            <TextField id="outlined-basic" label="Password" variant="outlined"
                onChange={(e) => { setPassword(e.target.value);}}
            />

            <Button variant="outlined" onClick={handleValidation}>Valider</Button>
            <Button variant="outlined" onClick={createAccount}>Se créer un compte</Button>

        </div>
    )
}