import React, { useEffect, useState } from 'react'
import { Localuser } from '../Localuser/Localuser'
import {connectionOptions, jitsiInitOptions} from './options'
import {Conference} from './Conference'
import { useStore } from './../Store/store'
import { Header } from '../Header/Header'

 /* globals: JitisMeetJS */

 //no reload?
const Connection = () => {

  const [connection, setConnection] = useState(undefined)
  const [connected, setConnected] = useState(false)
  const [JitsiMeetJS, setJitsiMeet] = useState()
  const setJsMeet = useStore(state => state.setJsMeet)
  const clearLocalTracks = useStore(state => state.clearLocalTracks)
  const clearUsers = useStore(state => state.clearUsers)

  useEffect(() => {
    const jsMeet = async () => window.JitsiMeetJS
    jsMeet().then(value => initConnection(value))
    return((connection) => {
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
    setJitsiMeet(jsMeet)
    setJsMeet(jsMeet)
    setConnection(tmpConnection)
  }

  return (
    <div>
      {connected && <Conference roomName="conference" JitsiMeetJS={JitsiMeetJS} connection={connection} />}
      {connected && <Localuser/>}
      <Header>Chatmosphere</Header>

    </div> 
  )
}


export default Connection