import * as React from 'react';
import './App.css';
import Connection from './components/connection/Connection';
import { useStore } from './components/Store/store';

function App() {
  return (
    <div className="App">
      <Connection />
    </div>
  );
}

export default App;
