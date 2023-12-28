import {Box, Container, IconButton} from "@mui/material";
import {MuiMarkdown} from "mui-markdown";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

function Recipe({ recipe, setSelectedRecipe }) {

    if(recipe === null) return

    const { text } = recipe

    return (
        <Container sx={{my: "15vh"}} className="saved-recipe">
            <Box sx={{ px: 2, py: 2, borderRadius: 5, borderTopLeftRadius: 0, backgroundColor: "#222" }}>
                <IconButton aria-label="back" onClick={(e) => {setSelectedRecipe(null)}}>
                    <ArrowBackIosNewIcon />
                </IconButton>
                <MuiMarkdown>{text}</MuiMarkdown>
            </Box>
        </Container>
    )
}

export default Recipe