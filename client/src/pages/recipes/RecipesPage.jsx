import {Box, CircularProgress, Container, Typography} from "@mui/material";
import Stack from "@mui/material/Stack";
import {orderBy, query, where} from "firebase/firestore";
import {useState} from "react";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {getMessageRef} from "../../features/authentication/auth";
import RecipeListItem from "./RecipeListItem";
import RecipeList from "./RecipeList";
import Recipe from "./Recipe";

function RecipesPage({ currentUser, db }) {

    const { uid } = currentUser
    const q = query(getMessageRef(db, uid), where("type", "==", "recipe"), orderBy("createdAt"));
    const [recipes, loadingRecipes, error] = useCollectionData(q) //Database recipes

    const [selectedRecipe, setSelectedRecipe] = useState(null)

    return (
        <Container component="main">
            {loadingRecipes && <Container sx={{display: 'flex', justifyContent: 'center'}}>
                <CircularProgress />
            </Container> /* Wait for database query */}
            {(!loadingRecipes && recipes.length === 0) && <>
                <Box fullWidth sx={{display: 'flex', justifyContent: 'center'}}>
                    <Stack direction="column" spacing={1}>
                        <Typography variant="h3" sx={{ color: "#ddd", textAlign: "center"}}>Oops!</Typography>
                        <Typography>It looks like you have no recipes! Head over to the chat to generate some.</Typography>
                    </Stack>
                </Box>
            </>}
            {(selectedRecipe === null)? <RecipeList recipes={recipes} setSelectedRecipe={setSelectedRecipe} /> : <Recipe recipe={selectedRecipe} setSelectedRecipe={setSelectedRecipe}/>}
        </Container>
    )
}

export default RecipesPage