import React, { useState } from 'react';
import './App.css';

import Navbar from './components/layout/top-navbar';
import WeatherCard from './components/util/weather-card';

function App() {
  return (
    <div className="App">
      <Navbar />
      <WeatherCard />
    </div>
  );
}

export default App;
