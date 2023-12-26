import React, {useState} from "react";
import Button from '@mui/material/Button';
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import DoneIcon from '@mui/icons-material/Done';
import TextField from '@mui/material/TextField';
import {Box, Container, Grid, Paper, Typography} from "@mui/material";

function WhatToCookForm({addMessage, setWaiting}) {

    const [name, setName] = useState("")

    const [skillLevel, setSkillLevel] = useState(1)

    const [complete, setComplete] = useState(false)

    const defaultApplianceData = [
        { id: "1", value: "Stove", selected: true},
        { id: "2", value: "Microwave", selected: false},
        { id: "3", value: "Air Fryer", selected: false},
        { id: "4", value: "Food Processor", selected: false},
        { id: "5", value: "Rice Cooker", selected: false},
        { id: "6", value: "Blender", selected: false},
    ];
    const [applianceData, setApplianceData] = useState(defaultApplianceData);
    const [checkedAppliances, setCheckedAppliances] = useState(["Stove"])

    const mealOptions = ["Breakfast", "Lunch", "Dinner"]
    const [mealSelected, setMealSelected] = useState(2); //Dinner is default

    const [ingredients, setIngredients] = useState("")

    const handleAppliance = (event, index) => {
        const updatedApplianceData = applianceData.map((elem, i) => {
            if (i === index) {
                // Flip selected
                elem.selected = !elem.selected
            }
            return elem;
        });

        setApplianceData(updatedApplianceData)

        const filtered = applianceData.filter(elem => elem.selected)

        let newChecked = []
        filtered.map((appliance) => (
            newChecked.push(appliance.value)
        ))
        setCheckedAppliances(newChecked);
    };

    const handleIngredients = (event) => {
        setIngredients(event.target.value)
    }


    function validateData() {
        if(name === "") return false
        if(checkedAppliances.length < 1) return false
        if(ingredients === "") return false
        return true
    }

    async function submit(event) {
        event.preventDefault()

        setComplete(true)

        if (!validateData()) {
            console.log("Invalid Data")
            return
        }

        const formData = {
            name: name,
            skillLevel: skillLevel,
            appliances: checkedAppliances,
            mealType: mealOptions[mealSelected],
            ingredients: ingredients
        }

        setWaiting(true)

        const serializedBody = JSON.stringify(formData);
        const fetchOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: serializedBody
        };

        await fetch('/what_to_cook', fetchOptions)
            .then((res) => res.json())
            .then((data) => addMessage("recipe", data.message.content))

        setWaiting(false);
    }

    return (
        <Container
            spacing={0}
        >
            <Paper
                elevation={3}
                sx={{
                    my: { xs: 3, md: 2 },
                    p: { xs: 2, md: 3 }
                }}
            >
                <Box
                    component="form"
                    onSubmit={submit}
                    className="what-to-cook"
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Name"
                                variant="standard"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value)
                                }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={5}>
                            <Typography align="left"> Cooking Skill Level: </Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <Stack direction="row" spacing={1}>
                                {[1, 2, 3, 4, 5].map((item, index) => {
                                    return (
                                        <Chip key={index}
                                              label={item}
                                              onClick={(e) => setSkillLevel(item)}
                                              variant={item === skillLevel ? "" : "outlined"}
                                        />
                                    );
                                })}
                            </Stack>
                        </Grid>
                        <Grid item xs={5}>
                            <Typography align="left"> This meal is for:</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <Stack direction="row" spacing={1}>
                                {mealOptions.map((item, index) => {
                                    return (
                                        <Chip key={index}
                                              label={item}
                                              onClick={(e) => setMealSelected(index)}
                                              icon={index === mealSelected ? <DoneIcon/> : null}
                                              variant={index === mealSelected ? "" : "outlined"}
                                        />
                                    );
                                })}
                            </Stack>
                        </Grid>
                        <Grid item xs={5}>
                            <Typography
                                align="left"
                            >
                                Kitchen Appliances:
                            </Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <Box
                                role="group"
                                sx={{display: 'flex', flexWrap: 'wrap', gap: 1}}
                            >
                                {applianceData.map((item, index) => {
                                    return (
                                        <Chip key={index}
                                              label={item.value}
                                              onClick={(e) => handleAppliance(e, index)}
                                              icon={item.selected ? <DoneIcon/> : null}
                                              variant={item.selected ? "" : "outlined"}
                                        />
                                    );
                                })}
                            </Box>
                        </Grid>
                        <Grid item xs={5}>
                            <Typography align="left">What ingredients do you have?</Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <TextField
                                label="Ingredients"
                                variant="standard"
                                value={ingredients}
                                onChange={handleIngredients}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                                disabled={complete}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>

    );
}

export default WhatToCookForm
