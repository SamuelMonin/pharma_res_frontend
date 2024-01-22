import React from 'react';
import {Component, useEffect, useState} from 'react';
import axios from 'axios'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { useSelector, useDispatch } from 'react-redux'
import { goLogin, reset } from '../redux/login'

export default function CreateAccount() {

    const dispatch = useDispatch()

    const[login, setLogin] = useState("")
    const[mail, setMail] = useState("")
    const[password, setPassword] = useState("")
    const[passwordConfirmation, setPasswordConfirmation] = useState("")


    const addItem = async (newObj) => {
      try {
        if(password === passwordConfirmation){
          await axios.post('http://localhost:5501/api/users/put-item', newObj)
        }
      } catch (err) {
          console.log(err);
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
                    if (password !== passwordConfirmation) {
                        return (
                            alert("Vos mots de passe sont différents")
                        )
                    }
                    else {
                        addItem({
                            login: login,
                            password: password,
                            mail: mail,
                        })
                        dispatch(reset())
                        dispatch(goLogin())
                        return (
                            alert("Votre compte : '" + login + "' a été créé.")
                        )

                    }
                }
                }
            >Subbmit</Button>

      </div>
    )
  }