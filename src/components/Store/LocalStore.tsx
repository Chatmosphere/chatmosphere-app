import { ProxyTypeSet } from "immer/dist/internal";
import React, { useEffect } from "react";
import create from "zustand";
import { devtools } from "zustand/middleware";
import { useConferenceStore } from "./ConferenceStore";
import { useConnectionStore } from "./ConnectionStore";



///LocalStore has dependency on ConferenceStore.
///This component provides the communication from ConferenceStore to LocalStore.
export const LocalStoreLogic = () => {

  const conference = useConferenceStore(state => state.conferenceObject)
  const { setMyID, setLocalTracks } = useLocalStore()
  const jsMeet:any = useConnectionStore(store => store.jsMeet)
  
  useEffect(()=>{
    if(conference?.myUserId()) setMyID(conference.myUserId())
  },[conference])
  
  useEffect(() => {
      jsMeet
        ?.createLocalTracks({ devices: [ 'audio', 'video' ] }, true)
        .then(tracks => {setLocalTracks(tracks)})
        .catch(error => {throw error;});
  },[ jsMeet, setLocalTracks ])
  
  return <></>
}


interface JitsiTrack {
  dispose: () => void
}

type Point = {x:number, y:number}

type Store = {
  localTracks: Array<JitsiTrack>
  localPosition: Point
  myId:string
  setLocalPosition: (newPosition:Point) => void
  setLocalTracks: (tracks:Array<JitsiTrack>) => void
  clearLocalTracks: () => void
  setMyID: (id:string) => void
}

export const useLocalStore = create<Store>(devtools((set,get) => ({
  localTracks: [],
  localPosition: {x:0, y:0},
  myId:"",
  setLocalPosition: newPosition => set({localPosition:newPosition}),
  setLocalTracks: tracks => set({localTracks:tracks}),
  clearLocalTracks: () => {
    get().localTracks.map(track => track.dispose())
    set({localTracks:[]})
  },
  setMyID: (id:string) => set({myId:id})
}),"LocalStore"))
