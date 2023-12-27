import { useEffect, useState, useRef } from "react";
import Chat from "./messages/Chat";
import WhatToCookForm from "./messages/WhatToCookForm";
import RecipeResponse from "./messages/RecipeResponse";
import {CircularProgress, Container} from "@mui/material";

import { collection, query, orderBy, limit, serverTimestamp, doc, setDoc} from "firebase/firestore"
import { useCollectionData } from "react-firebase-hooks/firestore";
import YouTubeEmbed from "./messages/YouTubeEmbed";



function AIChat({ currentUser, db }) {

    const { uid } = currentUser

    const messagesPath = "users/" + uid + "/messages"
    const messagesRef = collection(db, messagesPath)
    const q = query(messagesRef, orderBy("createdAt"), limit(25));

    const [messages, loadingMessages, error] = useCollectionData(q) //Database messages
    const [localMessages, setLocalMessages] = useState([]) //Local messages only

    useEffect(() => {
        if(loadingMessages || messages.length === 0) return
        let type = messages[messages.length - 1].type
        if(type === "recipe" || type === "youtube_embed") { //If the most recent change is a recipe
            setLocalMessages([{type: "recipe_response"}]) //Add recipe response bar
        } else {
            setLocalMessages([]) //Remove recipe response bar
        }
        bottomOfChat.current.scrollIntoView({ behavior: "smooth" }) //Scroll to bottom of chat
    }, [messages]);

    useEffect(() => {
        bottomOfChat.current.scrollIntoView({ behavior: "smooth" }) //Scroll to bottom of chat
    }, [localMessages])

    const bottomOfChat = useRef()

    const [waiting, setWaiting] = useState(false) //Used for loading circle.

    //Add a message to the database. Passed to children components.
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

        await setDoc(doc(messagesRef), data) //Create new doc with msg data
    }

    return (<>
        <Container component="main">

            {loadingMessages && <CircularProgress /> /* Wait for database query */}
            {messages && messages.map((msg, i) => {
                if(msg.hidden) return
                switch(msg.type) {
                    case 'chat':
                    case 'recipe':
                        return <Chat key={i} message={msg}/>
                    case 'what_to_cook':
                        return <WhatToCookForm key={i} uid={uid} addMessage={addMessage} setWaiting={setWaiting} disabled={i !== messages.length - 1}/>
                    case 'youtube_embed':
                        return <YouTubeEmbed vids={msg.vids}/>
                }
            })}

            {localMessages && localMessages.map((msg, i) => {
                switch(msg.type) {
                    case 'recipe_response':
                        return <RecipeResponse key={i + messages.length /* Offset indexes by messages */ } addMessage={addMessage} setWaiting={setWaiting} uid={uid} prevMsgType={messages[messages.length - 1].type} />
                }
            })}

            {waiting && <CircularProgress /> /* Wait for OpenAI query */}

            <div ref={bottomOfChat }></div>

        </Container>


        <form className="chat-form">

            <input className="chat-form" placeholder="say something nice" />

            <button type="submit" >🕊️</button>

        </form>
    </>)
}

export default AIChat