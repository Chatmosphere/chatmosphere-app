import create from "zustand";
import { devtools } from "zustand/middleware";

interface JitsiTrack {
  dispose: () => void
}

type Point = {x:number, y:number}

type Store = {
  localTracks: Array<JitsiTrack>
  localPosition: Point
  setLocalPosition: (newPosition:Point) => void
  setLocalTracks: (tracks:Array<JitsiTrack>) => void
  clearLocalTracks: () => void
}

export const useLocalStore = create<Store>((set,get) => {
  
  return ({
    localTracks: [],
    localPosition: {x:0, y:0},
    setLocalPosition: newPosition => set({localPosition:newPosition}),
    setLocalTracks: tracks => set({localTracks:tracks}),
    clearLocalTracks: () => {
      get().localTracks.map(track => track.dispose())
      set({localTracks:[]})
    }
  })
})