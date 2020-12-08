import * as React from 'react';
import './App.css';
import JitsiConnection from './components/JitsiConnection/JitsiConnection';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Localuser } from './components/Localuser/Localuser';
import { LocalStoreLogic } from './components/Store/LocalStore';
import { Settings } from './components/Settings/Settings';
import { Users } from './components/User/Users';

function App() {
  return (
    <div className="App">
      <Header>Chatmosphere</Header>
      <JitsiConnection />
      <LocalStoreLogic />
      <Users />
      <Localuser />
      <Settings />
      <Footer />
    </div>
  );
}

export default App;
