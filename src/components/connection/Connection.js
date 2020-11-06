import React, { useEffect, useState } from 'react'
import {connectionOptions, jitsiInitOptions} from './options'
import {Room} from './Room'
import create from 'zustand'
import omit from 'lodash'

 /* globals: JitisMeetJS */
 export const useStore = create(set => ({
   localTracks: [],
   users: {},
   addUser: (id) => set(state => ({users: {...state.users, [id]:{} } }) ),
   removeUser: (id) => set(state => omit(state, [id], true))
 }))

 //no reload?
const Connection = () => {

  const [connection, setConnection] = useState(undefined)
  const [connected, setConnected] = useState(false)
  const [JitsiMeetJS, setJitsiMeet] = useState()
  const [localTracks, setLocalTracks] = useState([])
  const [remoteTracks, setRemoteTracks] = useState({})

  useEffect(() => {
    const jsMeet = async () => window.JitsiMeetJS
    jsMeet().then(value => initConnection(value))
    return((connection) => {
      if(connection) connection.disconnect()
    })
  },[])
 
  const initConnection = (jsMeet) => {
    jsMeet.setLogLevel(jsMeet.logLevels.ERROR);
    jsMeet.init(jitsiInitOptions)
    const tmpConnection = new jsMeet.JitsiConnection(null, null, connectionOptions)
    tmpConnection.addEventListener(jsMeet.events.connection.CONNECTION_ESTABLISHED, () => {setConnected(true)});
    tmpConnection.addEventListener(jsMeet.events.connection.CONNECTION_FAILED, () => console.log("failed"));
    tmpConnection.addEventListener(jsMeet.events.connection.CONNECTION_DISCONNECTED, () => console.log("disconnect"));
    tmpConnection.connect()
    setJitsiMeet(jsMeet)
    setConnection(tmpConnection)
  }

  return (
    <div>
      {connected && <Room roomName="conference2" JitsiMeetJS={JitsiMeetJS} connection={connection} />}
      TEst
    </div> 
  )
}


export default Connection