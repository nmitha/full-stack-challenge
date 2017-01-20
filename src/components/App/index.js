import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import Routes from '../../routes';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        
        <header className="App-header">
          <h2>Employee Performance Review System</h2>
        </header>

        <nav>
          <a href="#employees">Manage Employees</a>
          <a href="#reviews">Manage Performance Reviews</a>
        </nav>
        
        <main>
          <Routes history={hashHistory} />
        </main>

      </div>
    );
  }
}

export default App;
