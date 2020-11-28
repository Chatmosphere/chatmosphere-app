import React, { useEffect, useState } from 'react'
import { useConnectionStore } from '../Store/ConnectionStore'
import { useConferenceStore } from '../Store/ConferenceStore'

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