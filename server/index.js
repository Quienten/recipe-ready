import express from "express"
import OpenAI from "openai";
import {cert, initializeApp} from 'firebase-admin/app';
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import serviceAccount from "./keys/recipeready-d6aa3-c85f3ebc56d3.json" assert { type: "json" }

const PORT = 3001;
const app = express();
app.use(express.json())

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const ASSISTANT_DESCRIPTION =
`You are a chef that wants to share their recipes with ordinary people.
Your name is Marcus.`


const WHAT_TO_COOK_PROMPT =
`Hello, my name is {name},
I would rate my cooking skills a {skillLevel} out of 5.
I own the following kitchen appliances: {appliances}.
I am looking for something to cook for {mealType}.
I possess {ingredients}.
Can you suggest a dish to make?`

const ANOTHER_PROMPT =  "Please give me another recipe with the information I provided."

let messages = [{"role": "system", "content": ASSISTANT_DESCRIPTION}]

function formatMessage(type, prompt) {
    return {role: type, content: prompt}
}

function getUserMessage(prompt) {
    return formatMessage("user", prompt)
}

function getAIMessage(prompt) {
    return formatMessage("assistant", prompt)
}


app.post('/what_to_cook', async (req, res) => {
    console.log(req.body)
    messages = []

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

    messages.push(completion.choices[0].message)

    res.status(200) //SUCCESS
    res.json({
        message: completion.choices[0].message
    })

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

    let data = {
        author: "ai",
        type: "recipe",
        createdAt: Timestamp.now(),
        text: completion.choices[0].message["content"]
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


let firebaseApp = initializeApp({
    credential: cert(serviceAccount)
})
let db = getFirestore();

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});


