import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import { Form, FormCheck } from "react-bootstrap";


const formSchema = yup.object().shape({
    size: yup
        .string(),
    originalRed: yup
        .boolean(),
    garlicButter: yup
        .boolean(),
    pesto: yup
        .boolean(),
    bbq: yup
        .boolean(),
    pepperoni: yup
        .boolean(),
    sausage: yup
        .boolean(),
    onion: yup
        .boolean(),
    olives: yup
        .boolean(),
    name: yup
        .string()
        .min(2, "Name must include 2 letters")
        .required("Name is required"),
    instructions: yup
        .string()
});

function Pizza() {

    const [userList, setUserList] = useState([]);

    const [formState, setFormState] = useState({
        size: "",
        originalRed: false,
        garlicButter: false,
        pesto: false,
        bbq: false,
        peppersoni: false,
        sausage: false,
        onion: false,
        olives: false,
        name: "",
        instructions: "",
    })


    const [buttonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setButtonDisabled(!valid);
        })
    }, [formState]);

    const [errorState, setErrorState] = useState({
        size: "",
        originalRed: "",
        garlicButter: "",
        pesto: "",
        bbq: "",
        pepperoni: "",
        sausage: "",
        onion: "",
        olives: "",
        name: "",
        instructions: "",
    });

    const validate = e => {
        let value =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;
        yup
        .reach(formSchema, e.target.name)
        .validate(value)
        .then(valid => {
            setErrorState({
            ...errorState,
            [e.target.name]: ""
            });
        })
        .catch(err => {
            setErrorState({
            ...errorState,
            [e.target.name]: err.errors[0]
            });
        });
    };

    const inputChange = e => {
        e.persist();
        validate(e);
        let value =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setFormState({ ...formState, [e.target.name]: value });
    };

    const formSubmit = e => {
        e.preventDefault();
        axios
            .post("https://reqres.in/api/users", formState)
            .then(response => {
                const apiReturn = response.data
                console.log(response.data)
                setUserList([...userList, apiReturn])
                setFormState(formState)
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <form onSubmit={formSubmit}>
                <div className="pizza-size">
                    <label htmlFor="size">
                        <h2>Choice of size</h2>
                        <p>Required</p>
                        <select
                            value={formState.size}
                            name="size"
                            id="size"
                            onChange={inputChange}
                        >
                            <option value="Default">--Select A Size--</option>
                            <option value="Personal">Personal</option>
                            <option value="Small">Small</option>
                            <option value="Medium">Medium</option>
                            <option value="Large">Large</option>
                            <option value="Party">Party</option>
                        </select>
                        {errorState.size.length > 0 ? (
                            <p className="error">{errorState.size}</p>
                        ) : null}
                    </label>
                </div>
                <div className="pizza-sauce">
                    <h2>Choice of Sauce:</h2>
                    <p>Required</p>
                    <label htmlFor="originalRed">
                        Original Red:
                        <input
                            type="checkbox"
                            id="originalRed"
                            name="originalRed"
                            checked={formState.originalRed}
                            onChange={inputChange}
                        />
                        {errorState.originalRed.length > 0 ? (
                        <p className="error">{errorState.originalRed}</p>
                        ) : null}
                    </label>
                    <br></br>
                    <label htmlFor="garlicButter">
                        Garlic Butter:
                        <input
                            type="checkbox"
                            id="garlicButter"
                            name="garlicButter"
                            checked={formState.garlicButter}
                            onChange={inputChange}
                        />
                        {errorState.garlicButter.length > 0 ? (
                        <p className="error">{errorState.garlicButter}</p>
                        ) : null}
                    </label>
                    <br></br>
                    <label htmlFor="pesto">
                        Pesto:
                        <input
                            type="checkbox"
                            id="pesto"
                            name="pesto"
                            checked={formState.pesto}
                            onChange={inputChange}
                        />
                        {errorState.pesto.length > 0 ? (
                        <p className="error">{errorState.pesto}</p>
                        ) : null}
                    </label>
                    <br></br>
                    <label htmlFor="bbq">
                        BBQ:
                        <input
                            type="checkbox"
                            id="bbq"
                            name="bbq"
                            checked={formState.bbq}
                            onChange={inputChange}
                        />
                        {errorState.bbq.length > 0 ? (
                        <p className="error">{errorState.bbq}</p>
                        ) : null}
                    </label>
                </div>
                <div className="pizza-toppings">
                    <h2>Choice of Toppings:</h2>
                    <p>Choose up to 10</p>
                    
                    <label htmlFor="pepperoni">
                        Pepperoni:
                        <input
                            type="checkbox"
                            id="pepperoni"
                            name="pepperoni"
                            checked={formState.pepperoni}
                            onChange={inputChange}
                        />
                        {errorState.pepperoni.length > 0 ? (
                        <p className="error">{errorState.pepperoni}</p>
                        ) : null}
                    </label>
                    <br></br>
                    <label htmlFor="sausage">
                        Sausage:
                        <input
                            type="checkbox"
                            id="sausage"
                            name="sausage"
                            checked={formState.sausage}
                            onChange={inputChange}
                        />
                        {errorState.sausage.length > 0 ? (
                        <p className="error">{errorState.sausage}</p>
                        ) : null}
                    </label>
                    <br></br>
                    <label htmlFor="onion">
                        Onion:
                        <input
                            type="checkbox"
                            id="onion"
                            name="onion"
                            checked={formState.onion}
                            onChange={inputChange}
                        />
                        {errorState.onion.length > 0 ? (
                        <p className="error">{errorState.onion}</p>
                        ) : null}
                    </label>
                    <br></br>
                    <label htmlFor="olives">
                        Olives:
                        <input
                            type="checkbox"
                            id="olives"
                            name="olives"
                            checked={formState.olives}
                            onChange={inputChange}
                        />
                        {errorState.olives.length > 0 ? (
                        <p className="error">{errorState.olives}</p>
                        ) : null}
                    </label>
                </div>
                <div className="special-instructions">
                    <label htmlFor="instructions">
                        Special Instructions:
                        <br></br>
                        <textarea
                            name="instructions"
                            id="instructions"
                            placeholder="Anything else you would like to add?"
                            value={formState.instructions}
                            onChange={inputChange}
                        />
                    </label>
                </div>
                <div className="name-div">
        <label htmlFor="name">
            Who is this pizza for?
            <br></br>
            <input
                type="text"
                name="name"
                id="name"
                placeholder="Must have at least 2 characters"
                value={formState.name}
                onChange={inputChange}
                />
                {errorState.name.length > 0 ? (
                    <p className="error">{errorState.name}</p>
                ) : null}
        </label>

            {/* <Form>
                <Form.Check 
                    type="switch"
                    id="custom-switch"
                    label="Check this switch"
                />
            </Form> */}

        </div>
                <div className="submit-button">
                    <button disabled={buttonDisabled}>Submit</button>
                </div>
            </form>
            
        </div>
    )

    }



export default Pizza;