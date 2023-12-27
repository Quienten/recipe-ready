import './assets/App.css';
import AIChat from "./components/AIChat"
import Account from "./components/Account";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, getAdditionalUserInfo } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getAnalytics } from "firebase/analytics";
import { useAuthState } from "react-firebase-hooks/auth";

import {Box, createTheme, ThemeProvider} from "@mui/material"
import Button from "@mui/material/Button";
import Google from "@mui/icons-material/Google"
import Stack from "@mui/material/Stack";
import {addInitialMessages} from "./features/authentication/auth";

// noinspection SpellCheckingInspection
const firebaseConfig = {
    apiKey: "AIzaSyCJ6lFYmx-88TmCVQq3Ew4hAlmIyvlKffE",
    authDomain: "recipeready-d6aa3.firebaseapp.com",
    projectId: "recipeready-d6aa3",
    storageBucket: "recipeready-d6aa3.appspot.com",
    messagingSenderId: "639862022067",
    appId: "1:639862022067:web:73c7cd8ad0d4c7fadaf5c6",
    measurementId: 'G-Z2Q5HLSE8Q'
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)
const auth = getAuth(app)

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {

    const [user] = useAuthState(auth)

    return (
        <ThemeProvider theme={darkTheme}>
            <div className="App">
                <header>
                    <h1>🍳 Recipe Ready 🍴</h1>
                    {auth.currentUser &&
                        <Stack direction="row" spacing={1} alignItems="center">
                            <SignOut/>
                            <Account currentUser={auth.currentUser} db={db}/>
                        </Stack>
                    }
                </header>

                <section>
                    {user ? <AIChat currentUser={auth.currentUser} db={db}/> : <SignIn/>}
                </section>

                <Box component={"footer"}/>
            </div>
        </ThemeProvider>
    );
}

function SignIn() {

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
            .then(firstTimeSignIn)
            .catch((error) => {
                //Do nothing
            })
    }

    //Initialize data for a first time user.
    const firstTimeSignIn = async(r) => {
        if(getAdditionalUserInfo(r).isNewUser) {
            await addInitialMessages(db, r.user.uid)
        }
    }

    return (
        <Box fullWidth sx={{display: 'flex', justifyContent: 'center'}}>
            <Button
                variant="contained"
                onClick={signInWithGoogle}
                sx={{width: 1/2}}
            >
                <Google/> Sign in with Google
            </Button>
        </Box>
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
