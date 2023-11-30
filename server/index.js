import express from "express"

import OpenAI from "openai";

const PORT = 3001;

const app = express();

app.use(express.json())

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const WHAT_TO_COOK_PROMPT =
`Hello, my name is {name},
I would rate my cooking skills a {skillLevel} out of 5.
I own the following kitchen appliances: {appliances}.
I am looking for something to cook for {mealType}.
I possess {ingredients}.
Can you suggest a dish to make?`


app.post('/what_to_cook', async (req, res) => {
    console.log(req.body)
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
    console.log(userPrompt)

    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {role: "user", content: userPrompt},

        ]
    })

    res.status(200) //SUCCESS
    res.json({
        message: completion.choices[0].message
    })

})

app.get("/api", async (req, res) => {

    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {role: "user", content: PROMPT},

        ]
    })

    res.json({
        message: completion.choices[0].message
    })
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});



