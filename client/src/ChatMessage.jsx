import ChefIcon from './chef.png';
import {Avatar, Box, Container, Grid, List, ListItem, ListItemText, Typography} from "@mui/material";
import { MuiMarkdown } from 'mui-markdown';

//Note that "text" is markdown.
function ChatMessage(props) {
    const { text, type } = props.message;

    return (
        <Container className={`message ${type}`} sx={{my: 3}}>
            <Grid container spacing={2}>
                <Grid item xs={1}>
                    <Avatar src={ChefIcon} className={`chef`}/>
                </Grid>
                <Grid item xs={11}>
                    <Box sx={{borderRadius: 4, borderBottomLeftRadius: 0, backgroundColor: "#222"}}>
                        <MuiMarkdown>{text}</MuiMarkdown>
                    </Box>
                </Grid>
            </Grid>

        </Container>
    )
}

export default ChatMessage