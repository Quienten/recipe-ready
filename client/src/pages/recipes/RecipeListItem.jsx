import { yellow } from '@mui/material/colors';
import StarIcon from "@mui/icons-material/Star";
import {Divider, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";

function RecipeListItem({ recipe, setSelectedRecipe }) {

    const { recipe_name, text, createdAt } = recipe

    return (<>
        <ListItem disablePadding>
            <ListItemButton onClick={(e) => {setSelectedRecipe(recipe)}}>
                <ListItemIcon>
                    <StarIcon sx={{ color: yellow[600] }}/>
                </ListItemIcon>
                <ListItemText primary={recipe_name} />
            </ListItemButton>
        </ListItem>
        <Divider variant="inset" component="li" />
    </>)
}

export default RecipeListItem