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
			REACT FINAL PROJECT
		</Typography>
		<Typography>
			Project ini menggunakan API dari https://newsapi.org dan Firebase, <Link to="/about" component={RouterLink}>lihat lebih detail</Link>
		</Typography>
		<Typography>
			&copy;2022 Agus Prawoto Hadi
		</Typography>
    </Box >
	);
  };
  
  export default NavBar;