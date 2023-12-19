import React from "react";
import './App.css';
import AIChat from "./AIChat"
import Button from "@mui/material/Button";

const CHAT_GPT_ON = false

function App() {

  return (
    <div className="App">
        <header>
            <h1>🍳 Recipe Ready 🍴</h1>
        </header>

        <section>
            <AIChat></AIChat>
        </section>
    </div>
  );
}

export default App;
