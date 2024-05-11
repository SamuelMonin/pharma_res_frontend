import React from 'react';
import {Component, useEffect, useState} from 'react';
import axios from 'axios'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { useSelector, useDispatch } from 'react-redux'
import { setNewAccount } from '../redux/login'
import { goCodeValidation, reset } from '../redux/view'

export default function CreateAccount() {

    const dispatch = useDispatch()
    const[login, setLogin] = useState("")
    const[mail, setMail] = useState("")
    const[password, setPassword] = useState("")
    const[passwordConfirmation, setPasswordConfirmation] = useState("")
    const[error, setError] = useState("")
    const [showPassword, setShowPassword] = React.useState(false)
    const [showPasswordConfirmation, setShowPasswordConfirmation] = React.useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const handleClickShowPasswordConfirmation = () => setShowPassword((show) => !show);
  
    const handleMouseDownPasswordConfirmation = (event) => {
      event.preventDefault();
    };
    
    const sendMail = async () => {
      try {
          await axios.post('http://localhost:5501/api/users/send-mail', {
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
          {/* <TextField id="outlined-basic" label="Password" variant="outlined" 
                    onChange={(e) => { setPassword(e.target.value);}}
          /> */}
          {/* <TextField id="outlined-basic" label="Password confirmation" variant="outlined" 
                    onChange={(e) => { setPasswordConfirmation(e.target.value);}}
          /> */}
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
          <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Confirmation du password</InputLabel>
              <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPasswordConfirmation ? 'text' : 'password'}
                  onChange={(e) => { setPasswordConfirmation(e.target.value);}}
                  endAdornment={
                  <InputAdornment position="end">
                      <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPasswordConfirmation}
                          onMouseDown={handleMouseDownPasswordConfirmation}
                          edge="end"
                          >
                          {showPasswordConfirmation ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                  </InputAdornment>
                  }
                  label="PasswordConfirmation"
              />
          </FormControl>

          <Button variant="outlined" onClick={() => {
            sendMail()
          }}
          >Valider</Button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    )
}