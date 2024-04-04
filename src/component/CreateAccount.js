import React from 'react';
import {Component, useEffect, useState} from 'react';
import axios from 'axios'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux'
import { setNewAccount, goCodeValidation, reset } from '../redux/login'

export default function CreateAccount() {

    const dispatch = useDispatch()
    const[login, setLogin] = useState("")
    const[mail, setMail] = useState("")
    const[password, setPassword] = useState("")
    const[passwordConfirmation, setPasswordConfirmation] = useState("")
    const[error, setError] = useState("")
    
    const sendMail = async () => {
      try {
          await axios.post('https://pharma-res-backend.onrender.com/api/users/send-mail', {
            login: login,
            mail: mail,
            password: password,
            passwordConfirmation: passwordConfirmation
          })
          dispatch(setNewAccount({
            login: login,
            password: password,
            mail: mail,
          }))
          dispatch(reset())
          dispatch(goCodeValidation())
      } catch (error) {
        if (error.response) {
            setError(error.response.data.message);
        } else {
            console.error('Erreur:', error.message);
        }
      }
    }

    return(
      <div>
          <h1>Création de votre compte</h1>
          <TextField id="outlined-basic" label="Login" variant="outlined" 
                    onChange={(e) => { setLogin(e.target.value);}}
          />
          <TextField id="outlined-basic" label="Mail" variant="outlined" 
                    onChange={(e) => { setMail(e.target.value);}}
          />
          <TextField id="outlined-basic" label="Password" variant="outlined" 
                    onChange={(e) => { setPassword(e.target.value);}}
          />
          <TextField id="outlined-basic" label="Password confirmation" variant="outlined" 
                    onChange={(e) => { setPasswordConfirmation(e.target.value);}}
          />
          <Button variant="outlined" onClick={() => {
            sendMail()
          }}
          >Valider</Button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    )
}