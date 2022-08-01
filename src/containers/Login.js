import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Container, CircularProgress, Alert, FormHelperText } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { signInWithEmailAndPassword } from 'firebase/auth';
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react'

import { auth } from '../config/firebase';

const Login = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [loadingSubmit, setLoadingSubmit] = useState(false) 
    
    const handleSubmit = async (event) => 
    {
        event.preventDefault();
        setLoadingSubmit(true)
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password');

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (error) {
            setLoadingSubmit(false)
            setErrorMessage(error.message);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    mt: 4,
                    mb: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                 <Avatar sx={{ m: 3, bgcolor: 'primary.main', width: 64, height: 64 }}>
                    <LockOutlinedIcon sx={{fontSize: 30}}/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login ke Akun Anda
                </Typography>
                { errorMessage && <Alert severity="error" sx={{width: '100%', mt:2, mb:1}}>{errorMessage}</Alert>}
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Alamat Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormHelperText>Email: agusph@gmail.com, password: 123456</FormHelperText>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2, mb: 2 }}
                        size="large"
                        disabled={loadingSubmit === true}
                        
                    >
                        { loadingSubmit && <CircularProgress color="inherit" size={20} sx={{mr:2}}/> }
                        Login
                    </Button>
                    <Grid container>
                        <Grid item sx={{margin: 'auto'}}>
                            Belum punya akun? 
                            <Link to="/register">
                                {" "} Daftar disini
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default Login;
