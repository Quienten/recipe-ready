import React from "react";
import './App.css';
import AIChat from "./AIChat"

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getAnalytics } from "firebase/analytics";
import { useAuthState } from "react-firebase-hooks/auth";

import {createTheme, ThemeProvider} from "@mui/material"
import Button from "@mui/material/Button";
import Google from "@mui/icons-material/Google"

const firebaseConfig = {
    apiKey: "AIzaSyCJ6lFYmx-88TmCVQq3Ew4hAlmIyvlKffE",
    authDomain: "recipeready-d6aa3.firebaseapp.com",
    projectId: "recipeready-d6aa3",
    storageBucket: "recipeready-d6aa3.appspot.com",
    messagingSenderId: "639862022067",
    appId: "1:639862022067:web:73c7cd8ad0d4c7fadaf5c6",
    measurementId: "G-Z2Q5HLSE8Q"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const auth = getAuth(app)

function App() {

    const [user] = useAuthState(auth)

    return (
        <ThemeProvider theme={darkTheme}>
            <div className="App">
                <header>
                    <h1>🍳 Recipe Ready 🍴</h1>
                    {auth.currentUser && <SignOut/>}
                </header>

                <section>
                    {user ? <AIChat db={db}/> : <SignIn/>}
                </section>
            </div>
        </ThemeProvider>
    );
}

function SignIn() {

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)

    }

    return (
        <Button
            variant="contained"
            onClick={signInWithGoogle}
            sx={{width: 1/2}}
        >
            <Google/> Sign in with Google
        </Button>
    )
}

function SignOut() {

    const signOut = () => {
        auth.signOut()
    }

    return (
        <Button onClick={signOut}>Sign Out</Button>
    )
}

export default App;
