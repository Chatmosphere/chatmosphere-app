import * as React from "react"
import { useEffect } from "react"
import { FaPhone } from "react-icons/fa"
import { Button } from "../../components/common/Buttons/Button"
import { Header } from "../../components/Header/Header"
import { Localuser } from "../../components/Localuser/Localuser"
import { useConferenceStore } from "../../Store/ConferenceStore"
import { useConnectionStore } from "../../Store/ConnectionStore"
import { useHistory } from "react-router-dom"
import { LocalStoreLogic } from "../../Store/LocalStoreLogic"
import { Room } from "../../components/Room/Room"
import { useLocalStore } from "../../Store/LocalStore"

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
