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
import { goCreateAccount, goProductList, reset } from '../redux/view'
import { connected, setUser } from '../redux/login'

export default function Login() {
    const dispatch = useDispatch()
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const log = async () => {
        try {
            const response = await axios.post('http://localhost:5501/api/users/login', { login, password });
                dispatch(connected());
                dispatch(setUser({
                    login: login,
                    password: password
                }));
                dispatch(reset())
                dispatch(goProductList())
                console.log("response.data.token : ", response.data.token)
                localStorage.setItem("token", response.data.token)
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                console.error('Erreur:', error.message);
            }
        }
    }

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
            <Button variant="outlined" onClick={log}>Valider</Button>
            <Button variant="outlined" onClick={createAccount}>Se créer un compte</Button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    )
}