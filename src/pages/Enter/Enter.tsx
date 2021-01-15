import * as React from "react"
import { Header } from "../../components/Header/Header"
import { LocalStoreLogic } from "./../../store/LocalStoreLogic"
import { Room } from "../../components/Room/Room"

import { Footer } from "../../components/Footer/Footer"
import { PanWrapper } from "../../components/PanWrapper/PanWrapper"
import { LocalUserContainer } from "../../components/Localuser/LocalUserContainer"
import {useParams} from 'react-router-dom'
import { useConferenceStore } from "../../store/ConferenceStore"
import { useEffect } from "react"

export const Enter = () => {
  const {id} = useParams() //get Id from url, should error check here I guess
  const setConferenceName = useConferenceStore(state => state.setConferenceName)

  useEffect(() => {
    setConferenceName(id)
  },[id])
  
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
