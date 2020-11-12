import * as React from 'react';
import './App.css';
import Room from './components/views/Room';
import ConnectionStore from './stores/ConnectionStore';
import RoomStore from './stores/RoomStore';

function App() {
  return (
    <div className="App">
      <ConnectionStore.Provider >
      <RoomStore.Provider >
        <Room />
      </RoomStore.Provider >


      </ConnectionStore.Provider>
    </div>
  );
}

export default App;
