import { AppBar, Box, styled, alpha, InputBase, List, ListItem, Toolbar, Typography, Link, TextField, FormControl, IconButton, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth'
import { Link as RouterLink, useNavigate} from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState } from 'react'

const navItems = [
  { text: 'Home', link: '/', icon: <HomeIcon/> },
  { text: 'About', link: '/about', icon: <InfoIcon/>},
  { text: 'Search', link: '/search', icon: <SearchIcon/> }
];

const NavBar = () => {
  
	const [user] = useAuthState(auth);
	const navigate = useNavigate();
	const [showSidebar, setShowSidebar] = useState(false)
  	const logout = () => {

		signOut(auth).then(() => {
			navigate("/");
		}).catch((error) => {
			console.log(error)
		});
 	};

	 const Search = styled('div')(({ theme }) => ({
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: alpha(theme.palette.common.white, 0.15),
		'&:hover': {
		  backgroundColor: alpha(theme.palette.common.white, 0.25),
		},
		marginLeft: 0,
		height: '40px',
		marginTop: '5px',
		width: '100%',
		[theme.breakpoints.up('sm')]: {
		  marginLeft: theme.spacing(1),
		  width: 'auto',
		},
	}));

	 const SearchIconWrapper = styled('div')(({ theme }) => ({
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	}));

	 const StyledInputBase = styled(InputBase)(({ theme }) => ({
		color: 'inherit',
		'& .MuiInputBase-input': {
		  padding: theme.spacing(1, 1, 1, 0),
		  // vertical padding + font size from searchIcon
		  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		  transition: theme.transitions.create('width'),
		  width: '100%',
		  [theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
			  width: '20ch',
			},
		  },
		},
	}));

	const handleSearchSubmit = (e) => {
		e.preventDefault()
		setShowSidebar(false)
		navigate('/search?q=' + e.target[0].value)
	}

	const handleMenuIconClick = () => {
		setShowSidebar(!showSidebar);
	}

	const handleSidebarClick = (e) => {
		if (e.target.name != 'search') {
			setShowSidebar(false);
		}
	}

	const handleOverlayClick = () => {
		setShowSidebar(false);
	}
	
	const linkStyle = {color: '#FFFFFF', textDecoration: 'none', textTransform: 'uppercase', fontFamily: 'monospace'}
	return (
      <AppBar sx={{ bgcolor: "#2e6dc6" }}>
        <Toolbar>
			<Box className="menu-icon" onClick={handleMenuIconClick}>
				<MenuIcon />
			</Box>
          <Typography
            variant="h6"
			className="logo"
            sx={{
              flexGrow: 1,
              display: 'block',
              fontFamily: 'monospace',
              fontWeight: 700,
            }}
          >
            <Button 
				component={RouterLink}
				to='/'
				key='home'
				startIcon={<NewspaperIcon/>}
				sx={{color: '#FFFFFF'}}
			>
              NEWS PORTAL
            </Button>
          </Typography>
		  <Box className={`navbar-menu-wrapper ${showSidebar ? 'show-sidebar' : ''}`} onClick={handleSidebarClick}>
			<List className="navbar-menu-container">
				<Box className="navbar-search">
				<Search>
					<SearchIconWrapper>
						<SearchIcon />
					</SearchIconWrapper>
					<form onSubmit={handleSearchSubmit}>
					<StyledInputBase
						placeholder="Search…"
						name="search"
						inputProps={{ 'aria-label': 'search' }}
					/>
					</form>
				</Search>
				</Box>
				{
					navItems.map((item) => (
						<ListItem key={item.text}>
							<Button startIcon={item.icon} component={RouterLink}
								to={item.link}
								key={item.text}
								
							>
								{item.text}
							</Button>
						</ListItem>
				))}
				{ 
					user &&
					<ListItem>
					<Button
						component={RouterLink}
						to='/'
						key='logout'
						startIcon={<LogoutIcon/>}
						onClick = {logout}
					>
					Logout
					</Button>
					</ListItem>
				}

				{
					!user &&
					<ListItem>
					<Button
						component={RouterLink}
						to='/login'
						key='Login'
						startIcon={<LoginIcon/>}
					>
					Login
					</Button>
					</ListItem>
				}

			</List>
			
		  </Box>
		  <Box className={`${showSidebar ? 'overlay' : ''}`} onClick={handleOverlayClick}></Box>
        </Toolbar>
      </AppBar>


	
	);
  };
  
 export default NavBar;