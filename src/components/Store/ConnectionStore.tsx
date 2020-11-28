import { mountStoreDevtool } from "simple-zustand-devtools";
import create from "zustand";
import { connectionOptions, jitsiInitOptions } from "../connection/options";

type Store = {
  jsMeet:any
  connection:any
  connected:boolean
  initJitsiMeet: () => any
  setConnected: () => void
  setDisconnected: () => void
  connectServer: () => void
  disconnectServer: () => void
}

export const useConnectionStore = create<Store>((set,get) => ({
  jsMeet:undefined,
  room:null,
  joined: false,
  conferenceName: 'conference',
  connection:undefined,
  connected:false,
  initJitsiMeet: async () => {
    // not sure if most elegant but now returns jitsi object and we can initialize conference nicely after server
    const promise = new Promise((res, rej) => {
      const jitsiMeet = async () => window.JitsiMeetJS
      jitsiMeet().then(jsMeet => {
        jsMeet.setLogLevel(jsMeet.logLevels.ERROR)
        jsMeet.init(jitsiInitOptions)
        const tmpConnection = new jsMeet.JitsiConnection(null, null, connectionOptions) //should be callable to init new connection to different servers
        tmpConnection.addEventListener(jsMeet.events.connection.CONNECTION_ESTABLISHED, get().setConnected)
        tmpConnection.addEventListener(jsMeet.events.connection.CONNECTION_FAILED, () => console.log("failed"))
        tmpConnection.addEventListener(jsMeet.events.connection.CONNECTION_DISCONNECTED, get().setDisconnected)
        tmpConnection.connect() // TODO separate in own function to connect & disconnect to different servers or call connection.connect() / connection.disconnect() from components?
        set({jsMeet:jsMeet, connection:tmpConnection})
        // get().connectServer()
        res(jsMeet)
      })
    })
    // const result = await promise 
    return await promise
  },
  connectServer: () => { get().connection?.connect() },
  disconnectServer: () => { get().connection?.disconnect() },
  setConnected: () => set({connected:true}), //actually this should initiate a new conference object without joining it 
  setDisconnected: () => set({connected:false})
}))


if(process.env.NODE_ENV === 'development') {
	mountStoreDevtool('useConnectionStore', useConnectionStore)
}