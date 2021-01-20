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

import {useParams} from 'react-router-dom'
import { useConferenceStore } from "../../store/ConferenceStore"


export const Enter = () => {
  const {id} = useParams() //get Id from url, should error check here I guess
  const setConferenceName = useConferenceStore(state => state.setConferenceName)

  React.useEffect(() => {
    setConferenceName(id)
  },[id])
  
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
