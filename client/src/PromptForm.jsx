import React from "react";

function PromptForm() {

    return (
        <form>
            <label>Name: <input type="text" name="name"/></label>
            <br/>
            <label> Cooking Skill Level:
                <input type="radio" name="skill" value={1}/> 1
                <input type="radio" name="skill" value={2}/> 2
                <input type="radio" name="skill" value={3}/> 3
                <input type="radio" name="skill" value={4}/> 4
                <input type="radio" name="skill" value={5}/> 5
            </label>
            <br/>
            <label> Kitchen Appliances:
                <input type="checkbox"/>
                Stove
                <input type="checkbox"/>
                Microwave
                <input type="checkbox"/>
                Air Fryer
                <input type="checkbox"/>
                Food processor
                <input type="checkbox"/>
                Rice cooker
                <input type="checkbox"/>
                Blender
            </label>
            <br/>
            <label> Kitchen Equipment:
                <input type="checkbox"/>
                Pan(s)
                <input type="checkbox"/>
                Pot(s)
                <input type="checkbox"/>
                Dutch Oven
            </label>
            <br/>
            <input type="submit" value="Submit" />
        </form>
    );
}

export default PromptForm
