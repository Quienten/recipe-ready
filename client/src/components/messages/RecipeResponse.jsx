import { Container } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {URL_EMBED_YOUTUBE} from "../../data/constants";

function RecipeResponse({ addMessage, setWaiting, uid, prevMsgType }) {

    async function generateAnother(event) {
        setWaiting(true)

        const formData = {
            uid: uid
        }

        const serializedBody = JSON.stringify(formData);
        const fetchOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: serializedBody
        };

        await fetch("/another", fetchOptions)
        setWaiting(false);
    }

    async function addYouTubeEmbed(event) {
        setWaiting(true)

        const formData = {
            uid: uid
        }

        const serializedBody = JSON.stringify(formData);
        const fetchOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: serializedBody
        };

        await fetch(URL_EMBED_YOUTUBE, fetchOptions)
        setWaiting(false);
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
                {prevMsgType === "recipe" && <Button variant="contained"
                        onClick={addYouTubeEmbed}
                >Can I have a YouTube video about that?</Button>}
                <Button variant="contained"
                        onClick={(e) => {addMessage("what_to_cook")}}
                >Start Over</Button>
            </Stack>
        </Container>
    )
}

export default RecipeResponse
