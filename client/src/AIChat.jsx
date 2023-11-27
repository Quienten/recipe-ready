import ChatMessage from "./ChatMessage";
import {useState} from "react";
import PromptForm from "./PromptForm";
import WhatToCookForm from "./WhatToCookForm";

const FIRST_MSG = "Hello, I am Chef Marcus, I will be helping you cook today! Please provide me your personal goals for this meal."

function AIChat() {
    const [formValue, setFormValue] = useState('');

    const [messages, setMessages] = useState([
        {id: 1, text: FIRST_MSG, type: "chat", author: "ai"},
        {type: "what_to_cook", author: "ai"},
    ])

    function addNewMessage(newMessage) {
        setMessages([...messages, newMessage])
    }

    return (<>
        <main>

            {messages.map(msg => {
                switch(msg.type) {
                    case 'chat':
                        return <ChatMessage key={msg.id} message={msg}/>
                    case 'what_to_cook':
                        return <WhatToCookForm addNewMessage={addNewMessage}/>
                }

            })}

            {/*<WhatToCookForm></WhatToCookForm>*/}

        </main>


        <form className="chat-form">

            <input className="chat-form" value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

            <button type="submit" disabled={!formValue}>🕊️</button>

        </form>
    </>)
}

export default AIChat