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
    //jitsi might have been initialized in enter.tsx.
    //But session "/session/:id" might have been called directly, so initJitsiMeet should be called.
    initJitsiMeet()
  },[initJitsiMeet])

  useEffect(() => {
    console.log("connectServer:",id)
      connectServer(id)
    return ()=> disconnectServer()
  },[id])

  useEffect(() => {
    console.log("initConference:",jsMeet, connected, initConference, id)
    if(jsMeet && connected) {
      initConference(id)
    }
  },[jsMeet, connected, initConference, id])


  return (
    null
  )
}


export default JitsiConnection