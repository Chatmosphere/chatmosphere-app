import produce from "immer";
import { ProxyTypeSet } from "immer/dist/internal";
import React, { useEffect } from "react";
import create from "zustand";
import { devtools } from "zustand/middleware";
import { Track, useConferenceStore, User } from "./ConferenceStore";
import { useConnectionStore } from "./ConnectionStore";



///LocalStore has dependency on ConferenceStore.
///This component provides the communication from ConferenceStore to LocalStore.
export const LocalStoreLogic = () => {

  const conference = useConferenceStore(state => state.conferenceObject)
  const { setMyID, setLocalTracks } = useLocalStore()
  const jsMeet = useConnectionStore(store => store.jsMeet)
  
  useEffect(()=>{
    if(conference?.myUserId()) setMyID(conference.myUserId())
  },[conference])
  
  useEffect(() => {
      jsMeet
        ?.createLocalTracks({ devices: [ 'audio', 'video' ] }, true)
        .then(tracks => {setLocalTracks(tracks)})
        .catch(error => {
          console.log(error)
        });
  },[ jsMeet, setLocalTracks ])
  
  return <></>
}

type Point = {x:number, y:number}

type Store = {
  myUser: User
  setLocalPosition: (newPosition:Point) => void
  setLocalTracks: (tracks:Track[]) => void
  clearLocalTracks: () => void
  setMyID: (id:string) => void
}

export const useLocalStore = create<Store>(devtools((set,get) => {
  const produceAndSet = (callback:(newState:Store)=>void)=>set(state => produce(state, newState => callback(newState)))

  return {
  myUser:{id:"",mute:false,volume:1,pos:{x:0, y:0}},
  setLocalPosition: newPosition => produceAndSet(newState=>{newState.myUser.pos=newPosition}),
  setLocalTracks: tracks => produceAndSet(newState=>{
    const audioTrack = tracks.find(t=>t.getType() === 'audio')
    const videoTrack = tracks.find(t=>t.getType() === 'video')
    newState.myUser.audio=audioTrack
    newState.myUser.video=videoTrack
  }),
  clearLocalTracks: () => produceAndSet(newState=>{
    newState.myUser.audio?.dispose()
    newState.myUser.video?.dispose()
    newState.myUser.audio=undefined
    newState.myUser.video=undefined
  }),
  setMyID: (id:string) => produceAndSet(newState=>{newState.myUser.id=id}),
}},"LocalStore"))
