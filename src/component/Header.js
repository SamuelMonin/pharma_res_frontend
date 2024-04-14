import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { useSelector, useDispatch } from 'react-redux'
import { goLogin, reset, unConnected, goProductList, goCart } from '../redux/login'

export default function Header() {

    const dispatch = useDispatch()

    const isLogin = useSelector((state) => state.login.isLogin)
    const user = useSelector((state) => state.login.user)

    const login = () => {

        dispatch(reset())
        dispatch(goLogin())

    }

    const logout = () => {

        dispatch(reset())
        dispatch(goLogin())
        dispatch(unConnected())

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
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                    <MenuIcon />
                    </IconButton>
                    <Button color="inherit" onClick={home} >PharmaRes</Button>

                    {isLogin ? (
                        <Button color="inherit" onClick={logout} >Se déconnecter</Button>
                    ) : null}

                    {isLogin === false ? (
                        <Button color="inherit" onClick={login} >Se connecter</Button>
                    ) : null}

                    {isLogin === true ? (
                        <p>{user.login}</p>
                    ) : null}

                    <Button color="inherit" onClick={cart} >Panier</Button>

                </Toolbar>
            </AppBar>
        </Box>
    );
}