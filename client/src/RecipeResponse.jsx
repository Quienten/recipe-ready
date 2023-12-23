import React, {useState} from "react";
import {Container} from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function RecipeResponse() {
    return (
        <Container
            spacing={0}
            sx={{mt: 4}}
        >
            <Stack direction="row" spacing={1}>
                <Button variant="contained">Generate Another Recipe</Button>
                <Button variant="contained">Can I have a YouTube video about that?</Button>
                <Button variant="contained">Start Over</Button>
            </Stack>
        </Container>
    )
}

export default RecipeResponse
