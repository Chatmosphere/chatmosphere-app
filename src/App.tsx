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
import { PropsList } from "react-zoom-pan-pinch/dist/store/interfaces/propsInterface";

const transformWrapperOptions: PropsList = {
  wheel: { step: 50 },
  scale: 1,
  defaultPositionX: 0,
  defaultPositionY: 0,
  positionX:0,
  positionY:0,
  options: { centerContent: false, limitToBounds: true, limitToWrapper: true, 
    minScale:0.2, 
    // maxPositionX:10000, maxPositionY:10000, 
    // minPositionX:0, minPositionY:0
  },
  // scalePadding:{animationTime:10},
  pan: { velocityEqualToMove: true },
  pinch: { disabled: true },
};

function App() {
  const timer = React.useRef<any>()
  const localHostPanChangeHandler = React.useRef<any>()
  const panChanged=(callback)=>{
    localHostPanChangeHandler.current = callback
  }

  function onPanChange(params){console.log(params)
    // setPanPos({x:params.positionX,y:params.positionY})
    // clearTimeout(timer.current)
    //timer.current = setTimeout(()=>)
    if(localHostPanChangeHandler.current)
      localHostPanChangeHandler.current({...params,
        positionX:Math.min(0,params.positionX),
        positionY:Math.min(0,params.positionY)})
  }
  function onZoomChange(params){console.log(params)
    // setPanPos({x:params.positionX,y:params.positionY})
  }

  return (
      <div className="App">
        <Header>Chatmosphere</Header>
        <JitsiConnection />
        <LocalStoreLogic />
    <TransformWrapper {...transformWrapperOptions} 
    onZoomChange={onPanChange}
    onPanning={onPanChange}
      onPinchingStop={onPanChange}
      >
        {/* https://github.com/prc5/react-zoom-pan-pinch#zoomin-prop-elements */}
        <TransformComponent>
          <Room>
            <Users />
            <Localuser /* panPos={panPos} */ panChanged={panChanged}/>
          </Room>
        </TransformComponent>
        <Settings />
        <Footer />
    </TransformWrapper>
      </div>
  );
}

export default App;
