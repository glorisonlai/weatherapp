import React from 'react';
import './App.css';

import Background from './components/layout/background/background';
import Navbar from './components/layout/navbar';
import CardRow from './components/util/card-row';
import {GlobalStateProvider} from './services/configContext';

const App = () => {
  return (
    <div className="App">
      <GlobalStateProvider>
        <Background />
        <div className="UI">
          <Navbar />
          <CardRow />
        </div>
      </GlobalStateProvider>
    </div>
  );
}

export default App;
