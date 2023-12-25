import ChatMessage from "./ChatMessage";
import { useEffect, useState, useRef } from "react";
import WhatToCookForm from "./WhatToCookForm";
import RecipeResponse from "./RecipeResponse";
import {CircularProgress, Container} from "@mui/material";

import { collection, query, orderBy, limit, serverTimestamp, doc, setDoc} from "firebase/firestore"
import { useCollectionData } from "react-firebase-hooks/firestore";



function AIChat({ currentUser, db }) {

    const { uid } = currentUser

    const messagesPath = "users/" + uid + "/messages"
    const messagesRef = collection(db, messagesPath)
    //const messagesRef = collection(db, "messages")
    const q = query(messagesRef, orderBy("createdAt"), limit(25));

    const [messages, loadingMessages, error] = useCollectionData(q)
    const [localMessages, setLocalMessages] = useState([])

    useEffect(() => {
        if(loadingMessages || messages.length === 0) return
        if(messages[messages.length - 1].type === "recipe") {
            setLocalMessages([{type: "recipe_response"}])
        } else {
            setLocalMessages([])
        }
        bottomOfChat.current.scrollIntoView({ behavior: "smooth" })
    }, [messages]);

    useEffect(() => {
        bottomOfChat.current.scrollIntoView({ behavior: "smooth" })
    })

    const [formValue, setFormValue] = useState('');

    const bottomOfChat = useRef()

    const [waiting, setWaiting] = useState(false)

    const addMessage = async(type, text="") => {

        let data = {
            author: "ai",
            type: type,
            createdAt: serverTimestamp()
        }

        //Add text for chat messages
        if(text !== "") {
            data["text"] = text
        }

        await setDoc(doc(messagesRef), data)
    }

    return (<>
        <Container component="main">

            {loadingMessages && <CircularProgress />}
            {messages && messages.map((msg, i) => {
                switch(msg.type) {
                    case 'chat':
                    case 'recipe':
                        return <ChatMessage key={i} message={msg}/>
                    case 'what_to_cook':
                        return <WhatToCookForm key={i} addMessage={addMessage} setWaiting={setWaiting}/>
                }
            })}

            {localMessages && localMessages.map((msg, i) => {
                switch(msg.type) {
                    case 'recipe_response':
                        return <RecipeResponse key={i} addMessage={addMessage} setWaiting={setWaiting}/>
                }
            })}

            {waiting && <CircularProgress />}

            <div ref={bottomOfChat}></div>

        </Container>


        <form className="chat-form">

            <input className="chat-form" value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

            <button type="submit" disabled={!formValue}>🕊️</button>

        </form>
    </>)
}

export default AIChat