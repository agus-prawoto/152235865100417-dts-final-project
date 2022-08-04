import { Box, Button, Toolbar, Typography, Link } from '@mui/material';
import {Link as RouterLink} from 'react-router-dom';
import React from 'react';

const NavBar = () => {
	
	return (
	<Box sx={{ background: '#686f90',
			color: '#f3f3ff',
			padding: '40px',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			textAlign: 'center',
			flexDirection: 'column'
		}}>
		<Typography>
			REA2 PRO DTS 2022 - FINAL PROJECT
		</Typography>
		<Typography>
			Project ini menggunakan API dari <Link sx={{color: '#85adff'}} href="https://newsapi.org">Newsapi</Link> dan <Link sx={{color: '#85adff'}} href="https://firebase.google.com/">Firebase</Link>, <Link sx={{color: '#85adff'}} to="/about" component={RouterLink}>lihat lebih detail</Link>
		</Typography>
		<Typography>
			&copy;2022 Agus Prawoto Hadi - 152235865100-417
		</Typography>
    </Box >
	);
  };
  
  export default NavBar;