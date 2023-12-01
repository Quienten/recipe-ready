import React from "react";
import './App.css';
import PromptForm from "./PromptForm"
import AIChat from "./AIChat"
import Button from "@mui/material/Button";

const CHAT_GPT_ON = false

function App() {
  const [data, setData] = React.useState(null);


  React.useEffect(() => {
    startRecipe()
  }, []);

  function startRecipe() {
    if(!CHAT_GPT_ON) return false
    fetch("/api")
        //.then((res) => console.log(res.json()))
        .then((res) => res.json())
        .then((data) => setData(data.message.content));
  }

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
