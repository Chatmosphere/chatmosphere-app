import React, { useEffect } from 'react'
import { useConnectionStore } from './../../store/ConnectionStore'
import { useConferenceStore } from './../../store/ConferenceStore'

 /* globals: JitisMeetJS */

 //no reload?
const JitsiConnection = () => {
  const {connected, initJitsiMeet, jsMeet} = useConnectionStore()
  const initConference = useConferenceStore(state => state.init)

  useEffect(() => {
    initJitsiMeet()
  },[initJitsiMeet])

  useEffect(() => {
    if(jsMeet && connected) {
      initConference()
    }
  },[jsMeet, connected, initConference])


  return (
    null
  )
}


export default JitsiConnection