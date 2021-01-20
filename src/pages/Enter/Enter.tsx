import * as React from "react"
import { Header } from "../../components/Header/Header"
import { LocalStoreLogic } from "../../store/LocalStoreLogic"
import { Room } from "../../components/Room/Room"

import { Footer } from "../../components/Footer/Footer"
import { PanWrapper } from "../../components/PanWrapper/PanWrapper"
import { UserDragContainer } from "../../components/Localuser/LocalUserContainer"
import { Localuser } from "../../components/Localuser/Localuser"
import { JoinButton } from "../../components/Footer/JoinButton/JoinButton"
import { MuteButton } from "../../components/Footer/MuteButton/MuteButton"

export const Enter = () => {

  return (
    <>
      <Header>Chatmosphere</Header>
        <LocalStoreLogic />
        <PanWrapper>
          <Room>
            <UserDragContainer>
              <Localuser />
            </UserDragContainer>
          </Room>
        </PanWrapper>
        <Footer>
          <JoinButton />
          <MuteButton />
        </Footer>
    </>
  )
}
