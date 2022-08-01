import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import { auth } from '../config/firebase'
import {Box, LinearProgress, Container} from '@mui/material';

const ProtectedRoute = ({ children, loginOnly = true }) => 
{
	const [user, loading] = useAuthState(auth);

	
	if (loading) {
		return <Container maxWidth="sm" sx={{mt:15}}><LinearProgress /></Container>
	} else {
  
		if (!user && loginOnly) {
			return <Navigate to="/login"/>;
		}
	
		if(user && !loginOnly) {
			return <Navigate to="/"/>;
		}
	
		return children;
	}
};

export default ProtectedRoute;