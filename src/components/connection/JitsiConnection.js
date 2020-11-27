import React, { useEffect, useState } from 'react'
import {connectionOptions, jitsiInitOptions} from './options'
import {Conference} from './Conference'
import { useLocalStore } from '../Store/LocalStore'
import { useConnectionStore } from '../Store/ConnectionStore'

 /* globals: JitisMeetJS */

 //no reload?
const JitsiConnection = () => {

  const [connection, setConnection] = useState(undefined)
  const {connected, setConnected} = useConnectionStore()
  const setJsMeet = useConnectionStore(state => state.setJsMeet)
  const clearLocalTracks = useLocalStore(state => state.clearLocalTracks)

  useEffect(() => {
    const jsMeet = async () => window.JitsiMeetJS
    jsMeet().then((value) => initConnection(value))
    return(() => {
      connection?.disconnect()
    })
  },[])
  
  const initConnection = (jsMeet) => {
    jsMeet.setLogLevel(jsMeet.logLevels.ERROR);
    jsMeet.init(jitsiInitOptions)
    const tmpConnection = new jsMeet.JitsiConnection(null, null, connectionOptions)
    tmpConnection.addEventListener(jsMeet.events.connection.CONNECTION_ESTABLISHED, () => {setConnected(true)});
    tmpConnection.addEventListener(jsMeet.events.connection.CONNECTION_FAILED, () => console.log("failed"));
    tmpConnection.addEventListener(jsMeet.events.connection.CONNECTION_DISCONNECTED, clearLocalTracks);
    tmpConnection.connect()
    setJsMeet(jsMeet)
    setConnection(tmpConnection)
  }

  return (
    <>
      {connected && <Conference connection={connection} />}
    </>
  )
}


export default JitsiConnection