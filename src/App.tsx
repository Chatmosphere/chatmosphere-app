import * as React from "react"
import "./App.css"
import JitsiConnection from "./components/JitsiConnection/JitsiConnection"
import { Footer } from "./components/Footer/Footer"
import { Header } from "./components/Header/Header"
import { Localuser } from "./components/Localuser/Localuser"
import { LocalStoreLogic, useLocalStore } from "./Store/LocalStore"
import { Settings } from "./components/Settings/Settings"
import { Users } from "./components/User/Users"
import { Info } from "./components/common/Info/Info"
import { PropsList } from "react-zoom-pan-pinch/dist/store/interfaces/propsInterface"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"
import { Room } from "./components/Room/Room"
import { useEffect } from "react"
import { useConferenceStore } from "./Store/ConferenceStore"
import { localTrackOptions, transformWrapperOptions } from "./components/JitsiConnection/options"

const roomSize = localTrackOptions.room.size


function App() {

  //TODO move this logic to LocalStore.tsx
  const localHostPanChangeHandler = React.useRef<any>()
  const panChanged = (callback) => {
    localHostPanChangeHandler.current = callback
  }

  function onPanChange(params) {
    if (localHostPanChangeHandler.current) {
      const viewport = {
        x: roomSize.x * params.scale,
        y: roomSize.y * params.scale,
      }
      const panLimit = {
        x: viewport.x - window.innerWidth,
        y: viewport.y - window.innerHeight,
      }
      localHostPanChangeHandler.current({
        ...params,
        positionX: Math.max(-panLimit.x, Math.min(0, params.positionX)),
        positionY: Math.max(-panLimit.y, Math.min(0, params.positionY)),
      })
    }
  }

  return (
    <div className="App">
      <Info>
        Welcome to our Prototype
        <br />
        Please use <b>Safari</b> or <b>Chrome</b> for now for a stable
        Experience
      </Info>
      <Header>Chatmosphere</Header>
      <JitsiConnection />
      <LocalStoreLogic />
      <TransformWrapper
        {...transformWrapperOptions}
        onZoomChange={onPanChange}
        onPanning={onPanChange}
        onPinchingStop={onPanChange}
      >
        {/* https://github.com/prc5/react-zoom-pan-pinch#zoomin-prop-elements */}
        <TransformComponent>
          <Room>
            <Users />
            <Localuser panChanged={panChanged} />
          </Room>
        </TransformComponent>
        <Footer />
      </TransformWrapper>
    </div>
  )
}

export default App
