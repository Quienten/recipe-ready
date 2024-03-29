import { useEffect, useState, useRef } from "react";
import {getMessageRef} from "../../features/authentication/auth";
import Chat from "../../components/messages/Chat";
import WhatToCookForm from "../../components/messages/WhatToCookForm";
import RecipeResponse from "../../components/messages/RecipeResponse";
import { CircularProgress, Container} from "@mui/material";

import {query, orderBy, limit, serverTimestamp, doc, setDoc, where} from "firebase/firestore"
import { useCollectionData } from "react-firebase-hooks/firestore";
import YouTubeEmbed from "../../components/messages/YouTubeEmbed";



function AIChat({ currentUser, db }) {

    const { uid } = currentUser

    const messagesRef = getMessageRef(db, uid)
    const q = query(messagesRef, where("hidden", "==", false), orderBy("createdAt", "desc"), limit(25));

    const [messages, loadingMessages, error] = useCollectionData(q) //Database messages
    const [localMessages, setLocalMessages] = useState([]) //Local messages only

    const bottomOfChat = useRef()

    const [waiting, setWaiting] = useState(false) //Used for loading circle.

    useEffect(() => {
        if(loadingMessages || messages.length === 0) return
        let type = messages[0].type //Newest message is index 0
        if(type === "recipe" || type === "youtube_embed") { //If the most recent change is a recipe
            setLocalMessages([{type: "recipe_response"}]) //Add recipe response bar
        } else {
            setLocalMessages([]) //Remove recipe response bar
        }
        bottomOfChat.current.scrollIntoView({ behavior: "smooth" }) //Scroll to bottom of chat
    }, [messages, loadingMessages, setLocalMessages]);

    useEffect(() => {
        if(waiting) {
            setLocalMessages([]) //Remove recipe response bar
        }
    }, [waiting])

    useEffect(() => {
        bottomOfChat.current.scrollIntoView({ behavior: "smooth" }) //Scroll to bottom of chat
    }, [localMessages])



    //Add a message to the database. Passed to children components.
    const addMessage = async(type, text="") => {

        let data = {
            author: "ai",
            type: type,
            createdAt: serverTimestamp(),
            hidden: false,
        }

        //Add text for chat messages
        if(text !== "") {
            data["text"] = text
        }

        await setDoc(doc(messagesRef), data) //Create new doc with msg data
    }

    return (<>
        <Container component="main">

            {loadingMessages && <Container sx={{display: 'flex', justifyContent: 'center'}}>
                <CircularProgress />
            </Container> /* Wait for database query */}
            {messages && messages.toReversed().map((msg, i) => {
                if(msg.hidden) return
                switch(msg.type) {
                    case 'chat':
                    case 'recipe':
                        return <Chat key={i} message={msg}/>
                    case 'what_to_cook':
                        return <WhatToCookForm key={i} uid={uid} addMessage={addMessage} setWaiting={setWaiting} disabled={waiting || i !== messages.length - 1}/>
                    case 'youtube_embed':
                        return <YouTubeEmbed key={i} vids={msg.vids}/>
                    default:
                        return
                }
            })}

            {localMessages && localMessages.map((msg, i) => {
                switch(msg.type) {
                    case 'recipe_response':
                        return <RecipeResponse key={i + messages.length /* Offset indexes by messages */ } addMessage={addMessage} setWaiting={setWaiting} uid={uid} prevMsgType={messages[0].type} />
                    default:
                        return
                }
            })}
            
            {waiting && <Container sx={{display: 'flex', justifyContent: 'center'}}>
                <CircularProgress />
            </Container> /* Wait for OpenAI query */}

            <div ref={bottomOfChat}></div>

        </Container>
    </>)
}

export default AIChat