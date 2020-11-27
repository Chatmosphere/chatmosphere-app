import create, { StoreApi } from "zustand";
import { devtools } from "zustand/middleware";

type Store = {
  jsMeet:any
  room:any
  joined:boolean
  conferenceName: string
  connected:boolean
  setJsMeet: (jsMeet:any) => void
  setRoom: (room:Object) => void
  joinRoom: () => void
  leaveRoom: () => void
  setConnected: () => void
  setDisconnected: () => void
}

export const useConnectionStore = create<Store>(devtools(set => ({
  jsMeet:undefined,
  room:null,
  joined: false,
  conferenceName: 'conference',
  connected:false,
  setJsMeet: jsMeet => {
    set({jsMeet: jsMeet})
  },
  setRoom: (room) => set({room: room}),
  joinRoom: () => set({joined:true}),
  leaveRoom: () => set({joined:false}),
  setConnected: () => set({connected:true}),
  setDisconnected: () => set({connected:false})
}),'ConnectionStore'))

