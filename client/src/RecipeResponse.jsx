import { Container } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function RecipeResponse({addMessage, setWaiting}) {

    async function generateAnother(event) {
        setWaiting(true)
        await fetch("/another")
            .then((res) => res.json())
            .then((data) => addMessage("recipe", data.message.content))
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
                <Button variant="contained">Can I have a YouTube video about that?</Button>
                <Button variant="contained">Start Over</Button>
            </Stack>
        </Container>
    )
}

export default RecipeResponse
