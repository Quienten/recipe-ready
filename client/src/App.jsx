import React from "react";
import './App.css';
import AIChat from "./AIChat"
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material"

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const CHAT_GPT_ON = false

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {

  return (
        <ThemeProvider theme={darkTheme}>
            {/*<CssBaseline />*/}
            <div className="App">
                <header>
                    <h1>🍳 Recipe Ready 🍴</h1>
                </header>

                <section>
                    <AIChat></AIChat>
                </section>
            </div>
        </ThemeProvider>
  );
}

export default App;
