import { Box, Button, Toolbar, Typography, Link } from '@mui/material';
import React from 'react';

const NavBar = () => {
	
	return (
	<Box sx={{ background: '#d2d1db',
			color: '#42435c',
			padding: '40px',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			textAlign: 'center',
			marginTop: '40px',
			flexDirection: 'column'
		}}>
		<Typography>
			REACT FINAL PROJECT
		</Typography>
		<Typography>
			Project ini menggunakan API dari https://newsapi.org dan Firebase 
		</Typography>
		<Typography>
			&copy;2022 Agus Prawoto Hadi
		</Typography>
    </Box >
	);
  };
  
  export default NavBar;