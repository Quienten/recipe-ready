import React, {useState} from "react";
import Button from '@mui/material/Button';
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import DoneIcon from '@mui/icons-material/Done';
import TextField from '@mui/material/TextField';
import {Box, Container, Grid, Paper, Typography} from "@mui/material";
import {URL_WHAT_TO_COOK} from "../../data/constants";
import ingredientList from "../../data/ingredients.json";

function WhatToCookForm({ uid, setWaiting, disabled }) {

    const [skillLevel, setSkillLevel] = useState(1)

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

        //Return if trying to disable to last checked appliance.
        if(checkedAppliances.length === 1 && applianceData[index].selected) return;

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
        if(checkedAppliances.length < 1) return false
        if(ingredients === "") return false
        return true
    }

    async function submit(event) {
        event.preventDefault()
        setWaiting(true)

        if (!validateData()) {
            console.log("Invalid Data")
            return
        }

        const formData = {
            skillLevel: skillLevel,
            appliances: checkedAppliances,
            mealType: mealOptions[mealSelected],
            ingredients: ingredients,
            uid: uid
        }



        const serializedBody = JSON.stringify(formData);
        const fetchOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: serializedBody
        };

        await fetch(URL_WHAT_TO_COOK, fetchOptions)
        setWaiting(false);
    }

    function randomIngredients() {
        let randomIngredients = []
        for(let i = 0; i < 4; i++) {
            let index = Math.floor(Math.random() * ingredientList.ingredients.length);
            if(randomIngredients.includes(ingredientList.ingredients[index])) {
                i--;
                continue;
            }
            randomIngredients.push(ingredientList.ingredients[index]);
        }

        let formattedIngredients = "";

        for(let i = 0; i < randomIngredients.length; i++) {
            formattedIngredients += randomIngredients[i] + ", "
        }

        formattedIngredients = formattedIngredients.substring(0, formattedIngredients.length - 2)

        setIngredients(formattedIngredients)
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
                                              disabled={disabled}
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
                                              disabled={disabled}
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
                                              disabled={disabled}
                                        />
                                    );
                                })}
                            </Box>
                        </Grid>
                        {/*<Grid item xs={3}>*/}
                        {/*    <Typography align="left">What ingredients do you have?</Typography>*/}
                        {/*</Grid>*/}
                        <Grid item xs={10}>
                            <TextField
                                label="Ingredients"
                                variant="standard"
                                value={ingredients}
                                onChange={handleIngredients}
                                sx={{width: 9/10, ml: 3}}
                                required
                                disabled={disabled}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <Button
                                variant="outlined"
                                disabled={disabled}
                                sx={{mt: 1.5}}
                                onClick={randomIngredients}
                            >
                                Random
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                                disabled={disabled}
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
