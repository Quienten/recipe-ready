import {Box, Container, IconButton} from "@mui/material";
import {MuiMarkdown} from "mui-markdown";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

function Recipe({ recipe, setSelectedRecipe }) {

    if(recipe === null) return

    const { text } = recipe

    return (
        <Container className="saved-recipe">
            <Box sx={{ my: 2, px: 2, py: 2, borderRadius: 10, backgroundColor: "#222" }}>
                <IconButton aria-label="back" onClick={(e) => {setSelectedRecipe(null)}}>
                    <ArrowBackIosNewIcon />
                </IconButton>
                <MuiMarkdown>{text}</MuiMarkdown>
            </Box>
        </Container>
    )
}

export default Recipe