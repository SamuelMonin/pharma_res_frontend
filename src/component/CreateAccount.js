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
    

    const sendMail = async () => {
      try {
        if(password === passwordConfirmation){
          await axios.post('http://localhost:5501/api/users/send-mail')
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
                        sendMail()
                        dispatch(setNewAccount({
                            login: login,
                            password: password,
                            mail: mail,
                        }
                        ))
                        dispatch(reset())
                        dispatch(goCodeValidation())
                        return (
                            alert("Un code de validation vient d'être envoyé à votre adresse mail.")
                        )

                    }
                }
                }
            >Valider</Button>

      </div>
    )
  }