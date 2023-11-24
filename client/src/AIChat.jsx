import ChatMessage from "./ChatMessage";
import {useState} from "react";
import PromptForm from "./PromptForm";

function AIChat() {
    const [formValue, setFormValue] = useState('');

    function sendMessage() {

    }

    return (<>
        <main>

            <ChatMessage key={1} message={{text:"Hello, I am Chef Marcus, I will be helping you cook today! Please provide me your personal goals for this meal.", type:"ai"}} />

            <span></span>

        </main>


        <form onSubmit={sendMessage}>

            <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

            <button type="submit" disabled={!formValue}>🕊️</button>

        </form>
    </>)
}

export default AIChat