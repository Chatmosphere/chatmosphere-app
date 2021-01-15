import * as React from "react"
import { Header } from "../../components/Header/Header"
import { LocalStoreLogic } from "./../../store/LocalStoreLogic"
import { Room } from "../../components/Room/Room"

import { Footer } from "../../components/Footer/Footer"
import { PanWrapper } from "../../components/PanWrapper/PanWrapper"
import { LocalUserContainer } from "../../components/Localuser/LocalUserContainer"

export const Enter = () => {

  return (
    <>
      <Header>Chatmosphere</Header>
        <LocalStoreLogic />
        <PanWrapper>
          <Room>
            <LocalUserContainer />
          </Room>
        </PanWrapper>
        <Footer startCall />
    </>
  )
}
