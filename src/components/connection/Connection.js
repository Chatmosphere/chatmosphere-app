import React, { useEffect, useState } from 'react'
import {connectionOptions, jitsiInitOptions} from './options'
import {Room} from './Room'
import create from 'zustand'
import omit from 'lodash'
import {devtools} from 'zustand/middleware'
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils'
import produce from 'immer'

 /* globals: JitisMeetJS */
 export const useStore = create(devtools((set,get) => ({
   localTracks: [],
   users: {}, //{ sajkldfjks:{audio:track, video:track}, 3ja9djak:{audio:track, video:track}  }
   addUser: (id) => set(state => ({users: {...state.users, [id]:{} } }) ),
   removeUser: (id) => set(state => omit(state, [id], true)),
   addAudioTrack: (id, track) => {
    const newUsers = produce(get().users, draftUsers => {
      draftUsers[id]['audio'] = track 
    })
    set(state => ({users: newUsers}))
   },
   addVideoTrack: (id, track) => {
     const newUsers = produce(get().users, draftUsers => {
       draftUsers[id]['video'] = track
     })
     set(state => ({users: newUsers}))
   }
 })))

 //no reload?
const Connection = () => {

  const [connection, setConnection] = useState(undefined)
  const [connected, setConnected] = useState(false)
  const [JitsiMeetJS, setJitsiMeet] = useState()
  const [localTracks, setLocalTracks] = useState([])
  const [remoteTracks, setRemoteTracks] = useState({})
  
  const tmpUser = useStore(state => state.users)
  console.log(tmpUser)

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
    tmpConnection.addEventListener(jsMeet.events.connection.CONNECTION_DISCONNECTED, () => console.log("disconnect, cleanup here"));
    tmpConnection.connect()
    setJitsiMeet(jsMeet)
    setConnection(tmpConnection)
  }

  return (
    <div>
      {connected && <Room roomName="conference2" JitsiMeetJS={JitsiMeetJS} connection={connection} />}
      Some Content Here

    </div> 
  )
}


export default Connection