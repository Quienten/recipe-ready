import express from "express"

import OpenAI from "openai";

const PORT = process.env.PORT || 3001;

const app = express();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const PROMPT =
`Hello, my name is Quienten,
I am a college student,
I would rate my cooking skills a 3 out of 5.
I own the following kitchen appliances: Stove, Oven, Microwave, Air Fryer.
I own the following kitchen equipment: Pots, Pans, Cast Iron Skillet.
I am looking for something to cook for Dinner.
I possess Chicken, Potatoes, and Onions. Can you suggest me a dish to make?`

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



