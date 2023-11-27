import React, {useState} from "react";

function WhatToCookForm({addNewMessage}) {

    const [name, setName] = useState("")

    const [skillLevel, setSkillLevel] = useState(1)

    const [checkedAppliances, setCheckedAppliances] = useState([]);
    const applianceData = [
        { id: "1", value: "Stove" },
        { id: "2", value: "Microwave" },
        { id: "3", value: "Air Fryer" },
        { id: "4", value: "Food Processor" },
        { id: "5", value: "Rice Cooker" },
        { id: "6", value: "Blender" },
    ];

    const [ingredients, setIngredients] = useState("")

    const handleName = (event) => {
        setName(event.target.value)
    }

    const handleSkill = (event) => {
        setSkillLevel(event.target.value)
    }

    const handleAppliance = (event) => {
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

        const data = {
            name: name,
            skillLevel: skillLevel,
            checkedAppliances: checkedAppliances,
            ingredients: ingredients
        }

        console.log(data)

        // fetch("/api")
        //     //.then((res) => console.log(res.json()))
        //     .then((res) => res.json())
        //     .then((data) => setData(data.message.content));

        addNewMessage({id: 2, text: "Very cool!", type: "chat", author: "ai"})
    }

    return (
        <div>
            <form className="what-to-cook" onSubmit={submit}>
                <label>Name:</label><input type="text" name="name" onChange={handleName}/>
                <br/>
                <label onChange={handleSkill}> Cooking Skill Level:
                    <input type="radio" name="skill" value={1}/> 1
                    <input type="radio" name="skill" value={2}/> 2
                    <input type="radio" name="skill" value={3}/> 3
                    <input type="radio" name="skill" value={4}/> 4
                    <input type="radio" name="skill" value={5}/> 5
                </label>
                <br/>
                <label> Kitchen Appliances: </label>
                {applianceData.map((item, index) => {
                    return (
                        <div key={item.id} className="checkbox-container">
                            <input
                                type="checkbox"
                                name="languages"
                                value={item.value}
                                onChange={handleAppliance}
                            />
                            <label>{item.value}</label>
                        </div>
                    );
                })}
                <br/>
                {/*<label> Kitchen Equipment:*/}
                {/*    <input type="checkbox"/>*/}
                {/*    Pan(s)*/}
                {/*    <input type="checkbox"/>*/}
                {/*    Pot(s)*/}
                {/*    <input type="checkbox"/>*/}
                {/*    Dutch Oven*/}
                {/*</label>*/}
                {/*<br/>*/}
                <label>What ingredients do you have? <input type="text" name="ingredients" onChange={handleIngredients}/></label>
                <br/>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default WhatToCookForm
