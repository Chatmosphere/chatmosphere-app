import create from "zustand";

type Store = {
  jsMeet:Object|null
  setJsMeet: (jsMeet:Object) => void
  room:Object|null
  setRoom: (room:Object) => void
  joined:boolean
  joinRoom: () => void
  leaveRoom: () => void
}

export const useConnectionStore = create<Store>(set => ({
  jsMeet:null,
  setJsMeet: jsMeet => set({jsMeet: jsMeet}),
  room:null,
  setRoom: (room) => set({room: room}),
  joined: false,
  joinRoom: () => set({joined:true}),
  leaveRoom: () => set({joined:false}),
}))