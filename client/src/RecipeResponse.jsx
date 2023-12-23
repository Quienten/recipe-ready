import React, {useState} from "react";
import {Container} from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function RecipeResponse({messages, setMessages, setWaiting}) {

    function filterRecipeResponse(msgs) {
        return msgs.filter((msg) => {return msg.type !== "recipe_response"})
    }

    async function generateAnother(event) {

        setWaiting(true)

        let newMessages = messages

        newMessages = filterRecipeResponse(newMessages)

        await fetch("/another")
            //.then((res) => console.log(res.json()))
            .then((res) => res.json())
            .then((data) => newMessages.push({text: data.message.content, type: "chat", author: "ai"}))

        setWaiting(false);

        newMessages.push({type: 'recipe_response'})

        setMessages(newMessages)
    }

    return (
        <Container
            spacing={0}
            sx={{mt: 4}}
        >
            <Stack direction="row" spacing={1}>
                <Button variant="contained"
                        onClick={generateAnother}
                >Generate Another Recipe</Button>
                <Button variant="contained">Can I have a YouTube video about that?</Button>
                <Button variant="contained">Start Over</Button>
            </Stack>
        </Container>
    )
}

export default RecipeResponse
