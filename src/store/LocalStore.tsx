import produce from "immer";
import create from "zustand";
import { Track, useConferenceStore } from "./ConferenceStore";
import { panOptions, transformWrapperOptions } from "../components/PanWrapper/panOptions";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { getVectorDistance, isOnScreen } from "../utils/VectorHelpers";
import { audioRadius } from "../utils/LookupTable";

//Feels like ZoomPan doesnt belong to LocalStore; maybe state of panHandler or own store?
type ZoomPan = {
  pos:IPoint
  pan:IPoint 
  scale:number
  onPanChange: (params:any) => void
} 

type ILocalStore = {
  setLocalPosition: (newPosition:IPoint) => void
  setLocalTracks: (tracks:Track[]) => void
  toggleMute: () => void
  clearLocalTracks: () => void
  setMyID: (id:string) => void
  calculateUsersInRadius:(myPos:IPoint)=>void
  calculateUserInRadius:(id:ID)=>void
  calculateUsersOnScreen:()=>void
  calculateUserOnScreen:(user:IUser, el:HTMLDivElement)=>void
  selectedUsers: Array<string>
  visibleUsers: Array<string>
} & IUser & ZoomPan

export const useLocalStore = create<ILocalStore>((set,get) => {

  const state = {
    id:"",
    mute:false,
    volume:1,
    video:undefined,
    audio:undefined,
    pos:panOptions.user.initialPosition,
    pan: {x:transformWrapperOptions.defaultPositionX || 0,y: transformWrapperOptions.defaultPositionY || 0},
    scale:1,
    selectedUsers: [],
    visibleUsers: [],
  }

  // # Private Functions
  const _produceAndSet = (callback:(newState:ILocalStore)=>void)=>set(state => produce(state, newState => callback(newState)))

  
  // # Public Functions
  const setLocalPosition = (newPosition) => {

    set({pos:newPosition})
  }
  
  const toggleMute = () => {
    const audioTrack = get().audio
    if(!audioTrack) return
    if(audioTrack.isMuted()) {
      audioTrack.unmute()
      set({mute:false})
    } else {
      audioTrack.mute()
      set({mute:true})
    }
  }

  const setLocalTracks = tracks => _produceAndSet(newState=>{
    const audioTrack = tracks.find(t=>t.getType() === 'audio')
    const videoTrack = tracks.find(t=>t.getType() === 'video')
    newState.video = videoTrack
    newState.audio = audioTrack
  })

  const clearLocalTracks = () => _produceAndSet(newState=>{
    // newState.audio?.dispose() //these throw errors on reconnection - some event handlers still leftover
    // newState.video?.dispose()
    newState.audio=undefined
    newState.video=undefined
  })

  const setMyID = (id:string) => set({id:id})

  const onPanChange = ({scale,positionX, positionY}) => {
    const viewport = {
      x: panOptions.room.size.x * scale,
      y: panOptions.room.size.y * scale,
    }
    const panLimit = {
      x: viewport.x - window.innerWidth,
      y: viewport.y - window.innerHeight,
    }
    const panPosition = {
      x: Math.max(-panLimit.x, Math.min(0, positionX)),
      y: Math.max(-panLimit.y, Math.min(0, positionY)),
    }
    calculateUsersOnScreen()
    set({scale:scale, pan:panPosition})
  }

  const calculateUsersInRadius = (myPos:IPoint) => {
    const users = useConferenceStore.getState().users
    const selectedUsers = Object.keys(users).filter(key => {
      const user = users[key]
      if(getVectorDistance(myPos, user.pos) < audioRadius) return true
      return false
    })
    _setSelectedUsers(selectedUsers)
  }
  // if user moves it can be calculated cheaper
  const calculateUserInRadius = (id:ID) => {
    const selectedUsers = get().selectedUsers
    const user = useConferenceStore.getState().users[id]  
    const localUserPosition:IPoint = get().pos //check if this is updated or kept by closure
    if(getVectorDistance(user.pos, localUserPosition) < audioRadius) {
      //user is within radius
      if(selectedUsers.indexOf(user.id) === -1) _pushSelectedUser(user.id)
    } else {
      //not in radius but in array -> remove from array
      if(selectedUsers.includes(user.id)) {
        const clearedUsers = selectedUsers.filter(el => el !== user.id);
        _setSelectedUsers(clearedUsers);
      }
    }
  }

  const calculateUsersOnScreen = () => {
    const els = document.querySelectorAll('.userContainer')
    const visibleUserIds:Array<string> = []
    els.forEach(element => {
      const tmpPos = element.getBoundingClientRect()
      if(isOnScreen({x:tmpPos.x, y:tmpPos.y}, tmpPos.width, tmpPos.height)) visibleUserIds.push(element.id) 
    });
    _setVisibleUsers(visibleUserIds)
  }
  //
  const calculateUserOnScreen = (user:IUser, el:HTMLDivElement) => {
    const visibleUsers = get().visibleUsers
    const pos = el.getBoundingClientRect()
    if(isOnScreen({x:pos.x, y:pos.y}, pos.width, pos.height)) {
      if(visibleUsers.indexOf(user.id) === -1) {
        _pushVisibleUser(user.id)
      }
    } else {
      //not on screen
      if(visibleUsers.includes(user.id)) {
        const clearedUsers = visibleUsers.filter(el => el !== user.id);
        _setVisibleUsers(clearedUsers)
      }
    }
  }

  const _setSelectedUsers = (ids) => _produceAndSet(store => {store.selectedUsers = [...ids]})
  const _pushSelectedUser = (id) => _produceAndSet(store => {store.selectedUsers.push(id)})
  const _setVisibleUsers = (ids) => {
    _produceAndSet(store => {store.visibleUsers = [...ids]})
    _setConstraint()
  }
  const _pushVisibleUser = (id) => {
    _produceAndSet(store => {store.visibleUsers.push(id)})
    _setConstraint()
  }

  const _setConstraint = () => {
    const conference = useConferenceStore.getState().conferenceObject
    const visibleUsers = get().visibleUsers
    // if(visibleUsers && visibleUsers.length > 0) {
      conference?.setReceiverConstraints({
        'selectedEndpoints': [...visibleUsers],
        'lastN':visibleUsers.length,
        'onStageEndpoints': [], // The endpoint ids of the participants that are prioritized up to a higher resolution.
        'defaultConstraints': { 'maxHeight': 180 }, // Default resolution requested for all endpoints.
        'constraints': { // Endpoint specific resolution.
        }
      })
    // }
  }

  return {
  ...state,
  setLocalPosition,
  setLocalTracks,
  toggleMute,
  clearLocalTracks,
  setMyID,
  calculateUsersOnScreen,
  calculateUserOnScreen,
  calculateUsersInRadius,
  calculateUserInRadius,
  onPanChange
}
})


// const unsub1 = useLocalStore.subscribe((i) => globalThis.globalStore = i)


if (process.env.NODE_ENV === "development") {
  let root = document.createElement('div');
  root.id = 'simple-zustand-devtools-3';
  document.body.appendChild(root);
  // @ts-ignore: Unreachable code error
  mountStoreDevtool("LocalStore", useLocalStore, root)
}