import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import './index.css';

const a = 'b'; // unused variable to test Stickler CI

const myFun = c => (d) =>{ return true; }; // messy code test

console.log('test');

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
