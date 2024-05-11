import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';

import { useSelector, useDispatch } from 'react-redux'
import { goLogin, reset, goProductList, goCart } from '../redux/view'
import { unConnected } from '../redux/login'

export default function Header() {

    const dispatch = useDispatch()
    const isLogin = useSelector((state) => state.login.isLogin)
    const user = useSelector((state) => state.view.user)

    const login = () => {
        dispatch(reset())
        dispatch(goLogin())
        console.log("isLogin : ", isLogin)
    }

    const logout = () => {
        dispatch(reset())
        dispatch(goLogin())
        dispatch(unConnected())
        localStorage.removeItem("token")
    }

    const home = () => {
        dispatch(reset())
        dispatch(goProductList())
    }

    const cart = () => {
        dispatch(reset())
        dispatch(goCart())
    }

    return (
        <div>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                        
                    <Button color="inherit" onClick={home} >PharmaRes</Button>
                
                    {(isLogin === true) ? (
                        <Button color="inherit" onClick={logout} >Se déconnecter</Button>
                    ) : null}

                    {(isLogin === false) ? (
                        <Button color="inherit" onClick={login} >Se connecter</Button>
                    ) : null}

                    {(isLogin === true) ? (
                        <p>{user.login}</p>
                    ) : null}

                    <Button color="inherit" onClick={cart} >Panier</Button>

                </Toolbar>
            </AppBar>
        </Box>
    </div>
    );
}