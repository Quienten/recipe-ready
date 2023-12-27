import express from "express"
import {cert, initializeApp} from 'firebase-admin/app';
import {getFirestore, Timestamp} from "firebase-admin/firestore";
import OpenAI from "openai";
import {ANOTHER_PROMPT, ASSISTANT_DESCRIPTION, WHAT_TO_COOK_PROMPT} from "./constants.js";
import serviceAccount from "./keys/recipeready-d6aa3-c85f3ebc56d3.json" assert {type: "json"}

import {searchYouTube} from "./youtube.js"

const PORT = 3001;
const app = express();
app.use(express.json())

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

function formatMessage(type, prompt) {
    return {role: type, content: prompt}
}

function getUserMessage(prompt) {
    return formatMessage("user", prompt)
}

function getAIMessage(prompt) {
    return formatMessage("assistant", prompt)
}

function getRecipeName(str) {
    let findRecipeName = /\*\*([^*]*(?:\*(?!\*)[^*]*)*)\*\*/g;
    let results = str.match(findRecipeName)
    if(results.length > 0) {
        return results[0].replaceAll("**", "") //Remove bold markdown
    }
    return ""
}

async function addRecipeMessage(uid, content) {
    let recipeName = getRecipeName(content)

    let data = {
        author: "ai",
        type: "recipe",
        createdAt: Timestamp.now(),
        text: content,
        recipe_name: recipeName
    }

    await addMessage(uid, data)
}

app.post('/what_to_cook', async (req, res) => {
    console.log(req.body)

    const uid = req.body["uid"]

    let messages = [{"role": "system", "content": ASSISTANT_DESCRIPTION}]

    let userPrompt = WHAT_TO_COOK_PROMPT
    for (const elem of Object.entries(req.body)) {
        const key = elem[0]
        let value
        if(Array.isArray(elem[1])) {
            let listStr = ""
            for(const i of elem[1]) {
                listStr += i + ", "
            }
            listStr = listStr.substring(0, listStr.length-2)
            value = listStr
        } else {
            value = elem[1]
        }
        userPrompt = userPrompt.replace("{"+key+"}", value)
    }

    messages.push(getUserMessage(userPrompt))
    console.log(messages)

    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages
    })

    //messages.push(completion.choices[0].message)

    await addRecipeMessage(uid, completion.choices[0].message.content)

    res.status(200) //SUCCESS
    res.json({ok:true})
})

app.post("/another", async (req, res) => {

    console.log(req.body)

    const uid = req.body["uid"]

    let chatHistory = await getRecipeChatHistory(uid)

    chatHistory.push(getUserMessage(ANOTHER_PROMPT))

    console.log(chatHistory)

    const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: chatHistory
    })

    await addRecipeMessage(uid, completion.choices[0].message.content)

    res.status(200) //SUCCESS
    res.json({ok:true})
})

app.post("/embed_youtube", async (req, res) => {

    console.log(req.body)

    const uid = req.body["uid"]

    const messagesPath = "users/" + uid + "/messages"
    const messagesRef = await db.collection(messagesPath)
    const q = await messagesRef.orderBy("createdAt", "desc").limit(1).get()
    if(q.empty) {
        console.log("nothing")
    }

    let msgData = q.docs[0].data()
    console.log("T")
    console.log(msgData)
    console.log("T")
    const recipe_name = msgData["recipe_name"]

    let vids = await searchYouTube(recipe_name)

    let data = {
        author: "ai",
        type: "youtube_embed",
        createdAt: Timestamp.now(),
        vids: vids,
        recipe_name: recipe_name
    }

    await addMessage(uid, data)

    res.status(200) //SUCCESS
    res.json({ok:true})
})

async function getRecipeChatHistory(uid) {
    const messagesPath = "users/" + uid + "/messages"
    const messagesRef = await db.collection(messagesPath)
    const q = await messagesRef.orderBy("createdAt").limit(10).get()
    if(q.empty) {
        console.log("nothing")
    }

    let recipeMessages = [{"role": "system", "content": ASSISTANT_DESCRIPTION}]

    for(let i = q.size - 1; i > 0; i--) {
        let msgData = q.docs[i].data()
        //console.log(msgData)
        if(msgData["type"] !== "recipe") break
        recipeMessages.push(getAIMessage(msgData["text"]))

    }

    return recipeMessages
}

async function addMessage(uid, data) {
    console.log(uid)
    console.log(data)
    const messagesPath = "users/" + uid + "/messages"
    const messagesRef = await db.collection(messagesPath)
    await messagesRef.doc().set(data)
}


const firebaseApp = initializeApp({
    credential: cert(serviceAccount)
})
const db = getFirestore();

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});


