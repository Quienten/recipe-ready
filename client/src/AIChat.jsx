import ChatMessage from "./ChatMessage";
import {useState} from "react";
import WhatToCookForm from "./WhatToCookForm";
import RecipeResponse from "./RecipeResponse";
import {CircularProgress, Container} from "@mui/material";

const FIRST_MSG = "Hello, I am Chef Marcus, I will be helping you cook today! Please provide me your personal goals for this meal."

function AIChat() {
    const [formValue, setFormValue] = useState('');

    const [waiting, setWaiting] = useState(false)

    const [messages, setMessages] = useState([
        {text: FIRST_MSG, type: "chat", author: "ai"},
        {type: "what_to_cook", author: "ai"},
    ])

    function addNewMessage(newMessage) {
        setMessages([...messages, newMessage])
    }

    return (<>
        <Container component="main">

            {messages.map((msg, i) => {
                switch(msg.type) {
                    case 'chat':
                        return <ChatMessage key={i} message={msg}/>
                    case 'what_to_cook':
                        return <WhatToCookForm key={i} messages={messages} setMessages={setMessages} setWaiting={setWaiting}/>
                    case 'recipe_response':
                        return <RecipeResponse key={i} messages={messages} setMessages={setMessages} setWaiting={setWaiting}/>
                }

            })}

            {waiting && <CircularProgress />}

        </Container>


        <form className="chat-form">

            <input className="chat-form" value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

            <button type="submit" disabled={!formValue}>🕊️</button>

        </form>
    </>)
}

export default AIChat