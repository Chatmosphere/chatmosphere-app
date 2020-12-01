import * as React from 'react';
import './App.css';
import JitsiConnection from './components/connection/JitsiConnection';
import { Header } from './components/Header/Header';
import { Localuser } from './components/Localuser/Localuser';
import { Settings } from './components/Settings/Settings';
import { Users } from './components/User/Users';

function App() {
  return (
    <div className="App">
      <Header>Chatmosphere</Header>
      <JitsiConnection />
      <Users />
      <Localuser />
      <Settings />
    </div>
  );
}

export default App;
