import logo from './logo.svg';
import './App.css';
import React from 'react';
import SheikGPT from './pages/SheikGPT';
import PrayerTimes from './pages/PrayerTimes';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
     
        <SheikGPT />
        <PrayerTimes/>
      
    </div>
  );
}

export default App;
