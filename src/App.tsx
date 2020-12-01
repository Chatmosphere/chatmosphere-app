import * as React from 'react';
import './App.css';
import JitsiConnection from './components/connection/JitsiConnection';
import { Footer } from './components/Footer/Footer';
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
      <Footer />
    </div>
  );
}

export default App;
