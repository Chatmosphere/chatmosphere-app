import React from "react"
import Stage from "../../addons/Stage"
import { StageButton } from "../../addons/Stage/components/StageButton"
import { ErrorHandler } from "../../components/common/Info/ErrorHandler"
import { Info } from "../../components/common/Info/Info"
import { Footer } from "../../components/Footer/Footer"
import { JoinButton } from "../../components/Footer/JoinButton/JoinButton"
import { MuteButton } from "../../components/Footer/MuteButton/MuteButton"
import { Header } from "../../components/Header/Header"
import JitsiConnection from "../../components/JitsiConnection/JitsiConnection"
import { Localuser } from "../../components/Localuser/Localuser"
import { UserDragContainer } from "../../components/Localuser/LocalUserContainer"
import { PanWrapper } from "../../components/PanWrapper/PanWrapper"
import { Room } from "../../components/Room/Room"
import { Users } from "../../components/User/Users"
import { LocalStoreLogic } from "../../store/LocalStoreLogic"
import { ScreenshareButton } from "../../addons/Screenshare/ScreenshareButton/ScreenshareButton"



export const Session = () => {
  return (
    <React.Fragment>
      <ErrorHandler />
      <Info>
        Welcome to our Prototype
        <br />
        Please use <b>Safari</b> or <b>Chrome</b> for now for a stable
        Experience
      </Info>
      <Header>Chatmosphere</Header>
      <JitsiConnection />
      <LocalStoreLogic />
      <PanWrapper>
        <Room>
          <Users />
          <UserDragContainer>
            <Localuser audioRadius />
          </UserDragContainer>
        </Room>
      </PanWrapper>
      <Footer>
        <StageButton />
        <JoinButton joined={true} />
        <MuteButton />
        <ScreenshareButton />
      </Footer>
      <Stage />
    </React.Fragment>
  )
}
