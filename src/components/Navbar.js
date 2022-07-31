import { AppBar, Box, Button, Toolbar, Typography, TextField, FormControl, IconButton } from '@mui/material';
import { HomeIcon } from '@mui/icons-material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth'
import { Link, NavLink } from 'react-router-dom';

const navItems = [
  { text: 'Indonesian', link: '/indonesian' },
  { text: 'Pricing', link: '/pricing' },
  { text: 'About', link: '/about' },
  { text: 'Login', link: '/login' }
];



const NavBar = () => {
  
	const navigate = useNavigate();
  	const onLogout = () => {

		signOut(auth).then(() => {
		// Sign-out successful.
			navigate("/login");
		}).catch((error) => {
		// An error happened.
		});
 	};
	
  
	return (
	<Box sx={{ display: 'flex' }}>
      <AppBar>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              display: 'block',
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
            }}
          >
            <Link style={{ color: 'inherit', textDecoration: 'inherit' }} to="/">
              NONTON
            </Link>
          </Typography>
          <Box sx={{ display: 'block' }}>
              
            {navItems.map((item) => (
              <NavLink
                to={item.link}
                key={item.text}
                className={({ isActive }) => isActive ? 'nav-active' : 'nav-inactive'}
              >
                {item.text}
              </NavLink>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Box >

	
	);
  };
  
  export default NavBar;