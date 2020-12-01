import { mountStoreDevtool } from "simple-zustand-devtools";
import create from "zustand";
import { jitsiInitOptions, getConnectionOptions, publicOptions } from "../connection/options";

type ConnectionStore = {
  serverUrl:string,
  jsMeet:any
  connection:any
  connected:boolean
} & ConnectionActions

type ConnectionActions = {
  initJitsiMeet: () => any
  connectServer: () => void
  disconnectServer: () => void
}

export const useConnectionStore = create<ConnectionStore>((set,get) => {
  
  const initialState = {
    serverUrl: "jitsi.chatmosphere.cc",
    jsMeet:undefined,
    room:null,
    connection:undefined,
    connected:false,
  }

  // # Private Functions
  const _setConnected = () => set({connected:true}) //actually this should initiate a new conference object without joining it 
  const _setDisconnected = () => set({connected:false})

  // # Public Functions

  // not sure if most elegant but asynchrone returns jitsi object so we could initialize conference nicely after server connection?
  const initJitsiMeet = async () => {
    const promise = new Promise((res, rej) => {
      const jitsiMeet = async () => window.JitsiMeetJS
      jitsiMeet().then(jsMeet => {
        jsMeet.setLogLevel(jsMeet.logLevels.ERROR)
        jsMeet.init(jitsiInitOptions)
        const connectionOptions = getConnectionOptions(get().serverUrl)
        const tmpConnection = new jsMeet.JitsiConnection(null, null, connectionOptions) //should be callable to init new connection to different servers
        tmpConnection.addEventListener(jsMeet.events.connection.CONNECTION_ESTABLISHED, _setConnected)
        tmpConnection.addEventListener(jsMeet.events.connection.CONNECTION_FAILED, (e) => console.log("failed",e))
        tmpConnection.addEventListener(jsMeet.events.connection.CONNECTION_DISCONNECTED, _setDisconnected)
        tmpConnection.connect() // TODO separate in own function to connect & disconnect to different servers or call connection.connect() / connection.disconnect() from components?
        set({jsMeet:jsMeet, connection:tmpConnection})
        // get().connectServer()
        res(jsMeet)
      })
    })
    // const result = await promise 
    return await promise
  }

  const connectServer = () => { get().connection?.connect() }
  const disconnectServer = () => { get().connection?.disconnect() }

  // # Return Object
  return ({
    ...initialState,
    initJitsiMeet,
    connectServer,
    disconnectServer
  })
})


if(process.env.NODE_ENV === 'development') {
	mountStoreDevtool('useConnectionStore', useConnectionStore)
}