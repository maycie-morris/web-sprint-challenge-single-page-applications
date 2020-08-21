import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import axios from 'axios';


const formSchema = yup.object().shape({
    position: yup.string(),
    sauce: yup.boolean().oneOf([true], "Please Choose A Sauce"),
    toppings: yup.boolean().oneOf([true], "Please Choose Toppings"),
    special: yup.string()
})