import * as React from "react"
import { useEffect } from "react"
import { FaPhone } from "react-icons/fa"
import { Button } from "../../components/common/Buttons/Button"
import { Header } from "../../components/Header/Header"
import { Localuser } from "../../components/Localuser/Localuser"
import { useConferenceStore } from "../../Store/ConferenceStore"
import { useConnectionStore } from "../../Store/ConnectionStore"
import { LocalStoreLogic } from "../../Store/LocalStore"
import {useHistory} from 'react-router-dom'

export const Enter = () => {
  const { initJitsiMeet,connectServer } = useConnectionStore()
  const conferenceName = useConferenceStore(state => state.conferenceName)
  const history = useHistory()

  useEffect(() => {
    initJitsiMeet()
  }, [initJitsiMeet])


	const onStartCall = (e) => {
    e.preventDefault()
    //perhaps it is better to create a connection and then forward to "session/" page?
		history.push(`/session/${conferenceName}`)
  }
  
  return (
    <>
      <Header>Chatmosphere</Header>

      <LocalStoreLogic />
      <Localuser />
      {/* temporary for testing only */}
      <Button onClick={onStartCall}><FaPhone/>Sart Call</Button>
    </>
  )
}
