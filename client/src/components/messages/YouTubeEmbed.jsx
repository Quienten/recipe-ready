import {ButtonGroup, Container, IconButton, Typography} from "@mui/material";
import React, {useState} from "react";
import Button from "@mui/material/Button";
import {ArrowLeft, ArrowRight} from "@mui/icons-material";

function YouTubeEmbed({ vids }) {

    const [vidIndex, setVidIndex] = useState(0)

    function changeVideo(inc) {
        let newIndex = vidIndex+inc
        if(newIndex < 0 || newIndex >= vids.length) return
        setVidIndex(newIndex)
    }

    return (
        <Container
            direction="column"
            alignItems="center"
            justify="center"
        >
            <iframe width="560" height="315" src={`https://www.youtube.com/embed/${vids[vidIndex]}?si=JFLcs_pC3PpEyMrs`}
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen>
            </iframe>
            <ButtonGroup>
                <IconButton onClick={(e) => changeVideo(-1)} disabled={vidIndex === 0}><ArrowLeft/></IconButton>
                <Typography>{vidIndex+1}/{vids.length}</Typography>
                <IconButton onClick={(e) => changeVideo(1)} disabled={vidIndex === vids.length - 1}><ArrowRight/></IconButton>
            </ButtonGroup>
        </Container>
    )
}

export default YouTubeEmbed