import List from "@mui/material/List";
import RecipeListItem from "./RecipeListItem";

function RecipeList({ recipes, setSelectedRecipe}) {



    return (
        <List sx={{ color: "white" }}>
            {recipes && recipes.reverse().map((recipe, i) => {
                return <RecipeListItem key={i} recipe={recipe} setSelectedRecipe={setSelectedRecipe}/>
            })}
        </List>
    )
}

export default RecipeList