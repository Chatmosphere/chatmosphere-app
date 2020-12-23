import React, { useEffect } from 'react'
import { useConnectionStore } from './../../Store/ConnectionStore'
import { useConferenceStore } from './../../Store/ConferenceStore'
import {useParams} from 'react-router-dom'

 /* globals: JitisMeetJS */

 //no reload?
const JitsiConnection = () => {
  const {connected, initJitsiMeet, connectServer, jsMeet, disconnectServer} = useConnectionStore()
  const initConference = useConferenceStore(state => state.init)
  const {id} = useParams() //get Id from url, should error check here I guess

  useEffect(() => {
    initJitsiMeet()
  },[initJitsiMeet])

  useEffect(() => {
    connectServer(id)
    return ()=> disconnectServer()
  },[id])

  useEffect(() => {
    if(jsMeet && connected) {
      initConference(id)
    }
  },[jsMeet, connected, initConference, id])


  return (
    null
  )
}


export default JitsiConnection