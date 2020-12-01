import create from "zustand";

interface JitsiTrack {
  dispose: () => void
}

type Point = {x:number, y:number}

type Store = {
  localTracks: Array<JitsiTrack>
  localPosition: Point
  mute: boolean
  setLocalPosition: (newPosition:Point) => void
  setLocalTracks: (tracks:Array<JitsiTrack>) => void
  toggleMute: () => void
  clearLocalTracks: () => void
}

export const useLocalStore = create<Store>((set,get) => {
  
  const initialState = {
    localTracks: [],
    mute: false,
    localPosition: {x:0, y:0}
  }

  const toggleMute = () => {
    const tmpTracks = get().localTracks
    tmpTracks.map((track:any) => {
      if(track.getType() === 'audio') {
        if(track.isMuted()) {
          track.unmute()
          set({mute:false})
        } else { 
          track.mute()
          set({mute:true})
        }
      }
    })
  }

  return ({
    ...initialState,
    setLocalPosition: newPosition => set({localPosition:newPosition}),
    setLocalTracks: tracks => set({localTracks:tracks}),
    toggleMute,
    clearLocalTracks: () => {
      get().localTracks.map(track => track.dispose())
      set({localTracks:[]})
    }
  })
})