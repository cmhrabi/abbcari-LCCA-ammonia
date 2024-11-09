import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './design/Button/Button';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          LCCA Platform
        </p>
        <Button>Button</Button>
      </header>
    </div>
  );
}

export default App;
