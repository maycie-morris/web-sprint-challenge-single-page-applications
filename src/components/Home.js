import React from 'react';
import { useHistory } from 'react-router-dom';

import pizzaimg from '../images/pizza.jpeg'


function Home(props) {
    const history = useHistory();

    return (
        <div className="home">
            <button
              className='shop-button'
              onClick={() => history.push('/pizza')}
            >
              Order Now!
            </button>
            <div className="imgcontainer">
              <img className="pizza" src= { pizzaimg } />
            </div>
        </div>
    );
};


export default Home;
