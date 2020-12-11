import React, { useCallback, useEffect } from 'react';
import { useConferenceStore } from '../../Store/ConferenceStore';
import { ReloadHint } from '../ReloadHint/ReloadHint';
import { AudioTrack } from './AudioTrack';
import { Name } from './Name';
import { VideoTrack } from './VideoTrack';


export const User = ({id}) => {

  const myPos = useConferenceStore(useCallback(store => store.users[id]['pos'], [id]))
  const myVolume = useConferenceStore(useCallback(store => store.users[id]['volume'], [id]))
  const isMute = useConferenceStore(store => store.users[id]['mute'])
  const calculateVolume = useConferenceStore(store => store.calculateVolume)

  useEffect(() => {
    calculateVolume(id)
  },[id, calculateVolume, myPos])


  return(
    <div style={{position:'absolute', left:`${myPos.x}px`, top:`${myPos.y}px`}} className="userContainer" >
      <VideoTrack id={id} />
      <ReloadHint />
      <AudioTrack id={id} volume={myVolume} />
      <Name>User {id}</Name>
      <div>Volume {Math.round(myVolume * 11)}</div>
      <div>User is {isMute ? "Mute" : "Unmuted"}</div>
    </div>
  )
}


