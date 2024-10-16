import React from 'react';
import logo from './logo.svg';
import './App.css';
import LCCAButton from './components/Button/Button';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          LCCA Platform
        </p>
        <LCCAButton/>
      </header>
    </div>
  );
}

export default App;
