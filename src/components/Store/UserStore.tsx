import produce from "immer";
import { mountStoreDevtool } from "simple-zustand-devtools";
import create from "zustand";
import { getVolumeByDistance } from "../VectorHelpers";
import { useLocalStore } from "./LocalStore";

declare global {
  interface Window {
    JitsiMeetJS: any
  }
}
type User = { mute:boolean, volume:number, pos:Point, audio:any, video:any }
type Users = { id?:User }
type Point = {x:number, y:number}

type Store = {
  users: Users
} & UserActions

type UserActions = {
  addUser: (id:number) => void
  removeUser: (id:number) => void
  updateUserPosition: (id:number, pos:Point) => void
  addAudioTrack: (id:number, track:any) => void
  removeAudioTrack: (id:number) => void
  addVideoTrack: (id:number, track:any) => void
  removeVideoTrack: (id:number) => void
  calculateVolume: (id:number) => void
  calculateVolumes: (localPos:Point) => void
}

const createUserActions = (set, get):UserActions => ({
  addUser: (id) => set(state => produce(state, newState => {
    newState.users[id] = {mute:false, volume:1, pos:{x:0, y:0}}
  })),
  removeUser: (id) => set(state => produce(state, newState => {
    delete newState.users[id]
  })),
  updateUserPosition: (id, pos) => set(state => produce(state, newState => {
    if(newState.users[id]) newState.users[id]['pos'] = pos
  })),
  addAudioTrack: (id, track) => set(state => produce(state, newState => {
    if(newState.users[id]) newState.users[id]['audio'] = track
  })),
  removeAudioTrack: id => set(state => produce(state, newState => {
    if(newState.users[id]) newState.users[id]['audio'] = null
  })),
  addVideoTrack: (id, track) => set(state => produce(state, newState => {
    if(newState.users[id]) newState.users[id]['video'] = track
  })),
  removeVideoTrack: id => set(state => produce(state, newState => {
    if(newState.users[id]) newState.users[id]['video'] = null
  })),
  calculateVolume: id => set(state => produce(state, newState => {
    const localUserPosition:Point = useLocalStore.getState().localPosition //check if this is updated or kept by closure
    newState.users[id]['volume'] = getVolumeByDistance(localUserPosition, state.users[id]['pos'])
  })),
  calculateVolumes: (localPos) => set(state => produce(state, newState => {
    const users = state.users
    Object.keys(users).map(key => {
      const user = users[key]
      newState.users[key]['volume'] = getVolumeByDistance(localPos, user.pos)
    })
  }))
})

export const useUserStore = create<Store>((set, get) => ({
  users: {},
  ...createUserActions(set,get)
}))


if(process.env.NODE_ENV === 'development') {
	mountStoreDevtool('UserStore', useUserStore)
}