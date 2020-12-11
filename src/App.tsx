import * as React from 'react';
import './App.css';
import JitsiConnection from './components/JitsiConnection/JitsiConnection';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Localuser } from './components/Localuser/Localuser';
import { LocalStoreLogic } from './Store/LocalStore';
import { Settings } from './components/Settings/Settings';
import { Users } from './components/User/Users';
import { Info } from './components/common/Info/Info';

function App() {
  return (
    <div className="App">
      <Info>
        Welcome to our Prototype<br />
        Please use <b>Safari</b> or <b>Chrome</b> for now for a stable Experience
      </Info>
      <Header>Chatmosphere</Header>
      <JitsiConnection />
      <LocalStoreLogic />
      <Users />
      <Localuser />
      <Footer />
    </div>
  );
}

export default App;
