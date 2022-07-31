import React from 'react';
import Box from '@mui/material/Box';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase';

const Home = () => {
  const [user] = useAuthState(auth);
  return (
    <>
    <div>Home</div>
    <Box sx={{ margin: 10 }}>
      Welcome member <br/>
      Current user : {user?.email}
    </Box>
    </>
  )
}

export default Home