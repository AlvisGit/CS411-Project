import { Outlet, Navigate } from "react-router-dom";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

const auth = firebase.auth();

const PrivateRoutes = ({children, ...rest}) => {
    const [user] = useAuthState(auth); 
    return (
        user ? <Outlet/> : <Navigate to="/login" />
    )
}

export default PrivateRoutes