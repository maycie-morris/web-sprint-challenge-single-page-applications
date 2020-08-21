import React from 'react';
import { useHistory } from 'react-router-dom';


function Home(props) {
    const history = useHistory();

    return (
        <div className='home-wrapper'>
            <img
              className='home-image'
              src="https://i.imgur.com/s6nhX7J.jpg"
              alt="image of pizza sitting in front of an oven"
            />

            <button
              className='shop-button'
              onClick={() => history.push('/pizza')}
            >
              Order Now!
            </button>
        </div>
    );
};


export default Home;
