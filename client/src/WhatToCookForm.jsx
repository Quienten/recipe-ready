import React, {useState} from "react";
import Button from '@mui/material/Button';
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import DoneIcon from '@mui/icons-material/Done';
import TextField from '@mui/material/TextField';
import {Box, FormControl, Typography} from "@mui/material";

function WhatToCookForm({addNewMessage}) {

    const [name, setName] = useState("")

    const [skillLevel, setSkillLevel] = useState(1)

    const [checkedAppliances, setCheckedAppliances] = useState([]);
    const defaultApplianceData = [
        { id: "1", value: "Stove", selected: false},
        { id: "2", value: "Microwave", selected: false},
        { id: "3", value: "Air Fryer", selected: false},
        { id: "4", value: "Food Processor", selected: false},
        { id: "5", value: "Rice Cooker", selected: false},
        { id: "6", value: "Blender", selected: false},
    ];
    const [applianceData, setApplianceData] = useState(defaultApplianceData);

    const mealOptions = ["Breakfast", "Lunch", "Dinner"]
    const [mealSelected, setMealSelected] = useState(2); //Dinner is default
    const [mealType, setMealType] = useState("Dinner");

    const [ingredients, setIngredients] = useState("")

    const handleName = (event) => {
        setName(event.target.value)
    }

    const handleSkill = (event) => {
        setSkillLevel(event.target.value)
    }

    const handleAppliance = (event, index) => {
        const updateApplianceData = applianceData.map((elem, i) => {
            if (i === index) {
                // Flip selected
                elem.selected = !elem.selected
            }
            return elem;
        });

        const value = event.target.value;
        const isChecked = event.target.checked;

        if (isChecked) {
            //Add checked item into checkList
            setCheckedAppliances([...checkedAppliances, value]);
        } else {
            //Remove unchecked item from checkList
            const filteredList = checkedAppliances.filter((item) => item !== value);
            setCheckedAppliances(filteredList);
        }
    };

    const handleMealType = (event) => {
        setMealType(event.target.value)
    }

    const handleIngredients = (event) => {
        setIngredients(event.target.value)
    }


    function validateData() {
        if(name === "") return false
        if(checkedAppliances.length === 0) return false
        if(ingredients === "") return false
        return true
    }

    function submit(event) {
        event.preventDefault()

        if(!validateData()) {
            addNewMessage({id: 2, text: "Invalid data", type: "chat", author: "ai"})
            return
        }

        const formData = {
            name: name,
            skillLevel: skillLevel,
            appliances: checkedAppliances,
            mealType: mealType,
            ingredients: ingredients
        }

        const serializedBody = JSON.stringify(formData);
        const fetchOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: serializedBody
        };

        fetch('/what_to_cook', fetchOptions)
            .then((res) => res.json())
            .then((data) => addNewMessage({id: 3, text: data.message.content, type: "chat", author: "ai"}))



    }

    return (
        <div>
            <FormControl
                className="what-to-cook"
                onSubmit={submit}>
                <TextField
                    label="Name"
                    variant="standard"
                    value={name}
                    onChange={(e) => {setName(e.target.value)}}
                />
                <br/>
                <label onChange={handleSkill}> Cooking Skill Level: </label>
                <Stack direction="row" spacing={1}>
                    {[1,2,3,4,5].map((item, index) => {
                        return (
                            <Chip key={index}
                                  label={item}
                                  onClick={(e) => setSkillLevel(item)}
                                  variant={item === skillLevel ? "" : "outlined"}
                            />
                        );
                    })}
                </Stack>
                <br/>
                <label onChange={handleMealType}> This meal is for:</label>
                    <Stack direction="row" spacing={1}>
                        {mealOptions.map((item, index) => {
                            return (
                                <Chip key={index}
                                      label={item}
                                      onClick={(e) => setMealSelected(index)}
                                      icon={index === mealSelected ? <DoneIcon /> : null}
                                      variant={index === mealSelected ? "" : "outlined"}
                                />
                            );
                        })}
                    </Stack>

                <br/>
                <Typography level="title-lg" mb={2}>
                    Kitchen Appliances:
                </Typography>
                <Box
                    role="group"
                    sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}
                >
                    {applianceData.map((item, index) => {
                        return (
                            <Chip key={index}
                                  label={item.value}
                                  onClick={(e) => handleAppliance(e, index)}
                                  icon={item.selected ? <DoneIcon /> : null}
                                  variant={item.selected ? "" : "outlined"}
                            />
                        );
                    })}
                </Box>
                <br/>
                <label>What ingredients do you have?</label>
                <TextField
                    label="Ingredients"
                    variant="standard"
                    value={ingredients}
                    onChange={handleIngredients}
                />
                <br/>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                Submit
                </Button>
            </FormControl>
        </div>
    );
}

export default WhatToCookForm
