import React, { useEffect } from 'react'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, firestore } from '../utils/firebase';

function Login() {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);
  return (
    <div><SignIn/></div>
  )
}

function SignIn() {
    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
      
    }
  
    return (
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    )
  }
  


export default Login