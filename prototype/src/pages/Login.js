import React, { useEffect } from 'react'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';


firebase.initializeApp({
    apiKey: "AIzaSyCrJ8pX1hkCL2RuqwUYmc_jU5F_3Qj_I1Q",
    authDomain: "cs411-recipe.firebaseapp.com",
    projectId: "cs411-recipe",
    storageBucket: "cs411-recipe.appspot.com",
    messagingSenderId: "675123654750",
    appId: "1:675123654750:web:e4fd3cc6b3ccef87df84cf",
    measurementId: "G-W4135JVBHB"
  })
  
  const auth = firebase.auth();
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