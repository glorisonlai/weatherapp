import React from 'react';
import './App.css';

import Navbar from './components/layout/top-navbar';
import CardRow from './components/util/card-row';

function App() {
  return (
    <div className="App">
      <Navbar />
      <CardRow />
    </div>
  );
}

export default App;
