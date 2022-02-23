import React from "react"
import ConnectedStage from "../../addons/Stage/Stage"
import { StageButton } from "../../addons/Stage/components/StageButton"
import { ErrorHandler } from "../../components/common/Info/ErrorHandler"
import { Info } from "../../components/common/Info/Info"
import { Footer } from "../../components/Footer/Footer"
import { JoinButton } from "../../components/Footer/JoinButton/JoinButton"
import { MuteButton } from "../../components/Footer/MuteButton/MuteButton"
import { Header } from "../../components/Header/Header"
import JitsiConnection from "../../components/JitsiConnection/JitsiConnection"
import { Localuser } from "../../components/User/Localuser/Localuser"
import { UserDragContainer } from "../../components/User/Localuser/LocalUserContainer"
import { PanWrapper } from "../../components/PanWrapper/PanWrapper"
import { Room } from "../../components/Room/Room"
import { Users } from "../../components/User/RemoteUser/Users"
import { LocalStoreLogic } from "../../store/LocalStoreLogic"
import { ScreenshareButton } from "../../addons/Screenshare/ScreenshareButton/ScreenshareButton"
import Chat from "../../addons/Chat/Chat"
import { MoreTab } from "../../components/Footer/MoreTab/MoreTab"



export const Session = () => {
  return (
    <React.Fragment>
      <Info>
        Welcome to our Prototype
        <br />
        Please use <b>Chromium</b> or <b>Chrome</b> for now for a stable
        Experience
      </Info>
      <ErrorHandler />
      <Header></Header>
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
      <Footer
        rightBox={[<Chat key="rB1"/>,<MoreTab key="rB2" />]}
        leftBox="Chatmosphere"
      >
        <StageButton />
        <MuteButton />
        <ScreenshareButton />
        <JoinButton joined={true} />
      </Footer>
      <ConnectedStage />
    </React.Fragment>
  )
}