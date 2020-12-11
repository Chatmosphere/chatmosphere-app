import * as React from "react";
import "./App.css";
import JitsiConnection from "./components/JitsiConnection/JitsiConnection";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Localuser } from "./components/Localuser/Localuser";
import { LocalStoreLogic } from "./components/Store/LocalStore";
import { Settings } from "./components/Settings/Settings";
import { Users } from "./components/User/Users";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Room } from "./components/Room/Room";

function App() {
  return (
    <div className="App">
      <Header>Chatmosphere</Header>
      <JitsiConnection />
      <LocalStoreLogic />
      {/* https://github.com/prc5/react-zoom-pan-pinch#zoomin-prop-elements */}
      <TransformWrapper wheel={{step:50}} scale={2} defaultPositionX={0} defaultPositionY={0} options={{centerContent:false,limitToBounds:false,limitToWrapper:true}}>
        <TransformComponent>
          <Room>
            <Users />
            <Localuser />
          </Room>
        </TransformComponent>
      </TransformWrapper>
      <Settings />
      <Footer />
    </div>
  );
}

export default App;
