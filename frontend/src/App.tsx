import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './DesignSystem/Button'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Ammonia LCCA Calculator
        </p>
      </header>
      <Button/>
    </div>
  );
}

export default App;
