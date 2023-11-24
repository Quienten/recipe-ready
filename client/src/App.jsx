import React from "react";
import logo from './logo.svg';
import './App.css';
import PromptForm from "./PromptForm";

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
      {/*<header className="App-header">*/}
      {/*  <img src={logo} className="App-logo" alt="logo" />*/}
      {/*  <p>{!data ? "Loading..." : data}</p>*/}
      {/*  <a*/}
      {/*    className="App-link"*/}
      {/*    href="https://reactjs.org"*/}
      {/*    target="_blank"*/}
      {/*    rel="noopener noreferrer"*/}
      {/*  >*/}
      {/*    Learn React*/}
      {/*  </a>*/}
      {/*</header>*/}
      <header>

      </header>
      <main>
        <PromptForm></PromptForm>
      </main>
    </div>
  );
}

export default App;
