import React from 'react';
import {Component, useEffect, useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import axios from 'axios'

import { useSelector, useDispatch } from 'react-redux'
import { connected, goCreateAccount, goProductList, reset, setUser } from '../redux/login'


export default function Login() {


    const dispatch = useDispatch()

    const[login, setLogin] = useState("");
    const[password, setPassword] = useState("");
    const[users, setUsers] = useState([]);
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };


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

            <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    onChange={(e) => { setPassword(e.target.value);}}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }
                    label="Password"
                />
            </FormControl>

            <Button variant="outlined" onClick={handleValidation}>Valider</Button>
            <Button variant="outlined" onClick={createAccount}>Se créer un compte</Button>

        </div>
    )
}