import { yellow } from '@mui/material/colors';
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import {Divider, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";

function RecipeListItem({ recipe, setSelectedRecipe }) {

    const { recipe_name, saved } = recipe

    return (<>
        <ListItem disablePadding>
            <ListItemButton onClick={(e) => {setSelectedRecipe(recipe)}}>
                <ListItemIcon>
                    {saved ? <StarIcon sx={{ color: yellow[600] }}/> : <StarBorderIcon/>}
                </ListItemIcon>
                <ListItemText primary={recipe_name} />
            </ListItemButton>
        </ListItem>
        <Divider variant="inset" component="li" />
    </>)
}

export default RecipeListItem