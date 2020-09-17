import React from "react";
import { Switch, Route, Link } from 'react-router-dom';
import './App.css'

import Home from './components/Home';
import Pizza from './components/Pizza'



const App = () => {
  return (
    <div className="home-page">
      <h1>Lambda Eats</h1>
      <div className='nav-links'>
        <Link to='/'>Home</Link>
        <Link to='/pizza'>Order</Link>
      </div>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/pizza'>
          <Pizza />
        </Route>
      </Switch>
    </div>
  );
};
export default App;
