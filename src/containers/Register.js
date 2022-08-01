import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Typography, Container, CircularProgress, Alert} from '@mui/material';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/firebase';
import { useState } from 'react'

const Register = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const [loadingSubmit, setLoadingSubmit] = useState(false) 

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoadingSubmit(true)
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password');

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // console.log(errorMessage);
                setLoadingSubmit(false)
                setErrorMessage(errorMessage);
                // ..
            });
        
       /*  console.log({
            email: data.get('email'),
            password: data.get('password'),
        }); */
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
                    Register Akun
                </Typography>
                { errorMessage && <Alert severity="error" sx={{width: '100%', mt:2, mb:1}}>{errorMessage}</Alert>}
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 2, mb: 2 }}
                        size="large"
                        disabled={loadingSubmit === true}
                    >
                        { loadingSubmit && <CircularProgress color="inherit" size={20} sx={{mr:2}}/> }
                        Register
                    </Button>
                    <Grid container>
                        <Grid item sx={{margin: 'auto'}}>
                            Sudah punya akun?
                            <Link to="/login">
                                {" "}Login disini
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default Register;
