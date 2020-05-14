import React from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import {withFirebase} from './comps/Firebase'
function App(props) {
  return (
    <div className="App">
      <div>
        <h1>Elijah Allen</h1>
        <h3>Coding Challenge</h3>
      </div>
      
    </div>
  );
}

export default withFirebase(App);
