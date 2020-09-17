import React from 'react';
import { useHistory } from 'react-router-dom';


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
        </div>
    );
};


export default Home;
