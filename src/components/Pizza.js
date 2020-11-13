import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';
// import Switch from 'react-input-switch';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputBase from '@material-ui/core/InputBase';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';

const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
        '&:hover': {
          backgroundColor: 'transparent',
        },
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '10rem',
          },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      width: '5rem',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
    icon: {
        borderRadius: 3,
        width: 16,
        height: 16,
        boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: 'rgba(19,124,189,.6)',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        '$root.Mui-focusVisible &': {
          outline: '2px auto rgba(19,124,189,.6)',
          outlineOffset: 2,
        },
        'input:hover ~ &': {
          backgroundColor: '#ebf1f5',
        },
        'input:disabled ~ &': {
          boxShadow: 'none',
          background: 'rgba(206,217,224,.5)',
        },
    },
    checkedIcon: {
        backgroundColor: '#137cbd',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
          display: 'block',
          width: 16,
          height: 16,
          backgroundImage:
            "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
            " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
            "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
          content: '""',
        },
        'input:hover ~ &': {
          backgroundColor: '#106ba3',
        },
      },
  }))(InputBase);

  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
  }));

  function StyledCheckbox(props) {
    const classes = useStyles();
  
    return (
      <Checkbox
        className={classes.root}
        disableRipple
        color="default"
        checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
        icon={<span className={classes.icon} />}
        inputProps={{ 'aria-label': 'decorative checkbox' }}
        {...props}
      />
    );
  }

  const PurpleSwitch = withStyles({
  switchBase: {
    color: grey[300],
    '&$checked': {
      color: grey[500],
    },
    '&$checked + $track': {
      backgroundColor: grey[500],
    },
  },
  checked: {},
  track: {},
})(Switch);


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
        gluten: true,
        instructions: ""
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

    // Toggle

    const [value, setValue] = useState('no');

    return (
        <div className="form">
            <form onSubmit={formSubmit}>
                <div className="pizza-size">
                    <label htmlFor="size">
                        <h2>Choice of size</h2>
                        <p>Required</p>
                        <FormControl variant="outlined">
                            <Select
                                value={formState.size}
                                name="size"
                                id="size"
                                onChange={inputChange}
                                input={<BootstrapInput />}
                            >
                                <option value="Default">--Select A Size--</option>
                                <option value="Personal">Personal</option>
                                <option value="Small">Small</option>
                                <option value="Medium">Medium</option>
                                <option value="Large">Large</option>
                                <option value="Party">Party</option>
                            </Select>
                        </FormControl>
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
                        <Checkbox
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
                        <Checkbox
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
                        <Checkbox
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
                        <Checkbox
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
                    <p>Choose up to 4</p>
                    
                    <label htmlFor="pepperoni">
                        Pepperoni:
                        <Checkbox
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
                        <Checkbox
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
                        <Checkbox
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
                        <Checkbox
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
                {/* <div className="gluten-crust">
                <label htmlFor="glutenCrust">
                    <FormControlLabel
                        control = {
                <PurpleSwitch
                    onChange={inputChange}
                    checked={formState.gluten}
                />} />
                    Gluten Free Crust (+ $1.00)
                </label>
                </div> */}
                <div className="special-instructions">
                    <label htmlFor="instructions">
                        Special Instructions:
                        <br></br>
                        <TextField
                            name="instructions"
                            id="instructions"
                            multiline
                            rowsMax={4}
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
            <TextField
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


         </div>
                <div className="submit-button">
                    <button disabled={buttonDisabled}>Submit</button>
                </div>
            </form>
            
        </div>
    )

    }



export default Pizza;