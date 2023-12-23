import chef_icon from './chef.png';
import {Avatar, Container, Grid, Typography} from "@mui/material";

function ChatMessage(props) {
    const { text, type} = props.message;

    return (<>
        <Container className={`message ${type}`}>
            <Grid container spacing={2}>
                <Grid item xs={1}>
                    <Avatar src={chef_icon} className={`chef`}/>
                </Grid>
                <Grid item xs={11}>
                    <Typography align="left"
                        sx={{borderRadius: 4, borderBottomLeftRadius: 0, backgroundColor: "#222"}}
                    >{text}</Typography>
                </Grid>
            </Grid>

        </Container>
    </>)
}

export default ChatMessage