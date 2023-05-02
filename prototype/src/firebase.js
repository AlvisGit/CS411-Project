import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCrJ8pX1hkCL2RuqwUYmc_jU5F_3Qj_I1Q",
    authDomain: "cs411-recipe.firebaseapp.com",
    projectId: "cs411-recipe",
    storageBucket: "cs411-recipe.appspot.com",
    messagingSenderId: "675123654750",
    appId: "1:675123654750:web:e4fd3cc6b3ccef87df84cf",
    measurementId: "G-W4135JVBHB"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore };