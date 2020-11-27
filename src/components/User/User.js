import React, { useCallback, useEffect } from 'react';
import { useUserStore } from '../Store/UserStore';
import { AudioTrack } from './Audio';
import { Name } from './Name';
import { VideoTrack } from './Video';

export const User = ({id}) => {

  const myPos = useUserStore(useCallback(store => store.users[id]['pos'], [id]))
  const myVolume = useUserStore(useCallback(store => store.users[id]['volume'], [id]))
  const isMute = useUserStore(store => store.users[id]['mute'])
  const calculateVolume = useUserStore(store => store.calculateVolume)

  useEffect(() => {
    calculateVolume(id)
  },[id, calculateVolume, myPos])


  return(
    <div style={{position:'absolute', left:`${myPos.x}px`, top:`${myPos.y}px`}} className="userContainer" >
      <VideoTrack id={id} />
      <AudioTrack id={id} volume={myVolume} />
      <Name>User {id}</Name>
      <div>Volume {Math.round(myVolume * 11)}</div>
      <div>User is {isMute ? "Mute" : "Unmuted"}</div>
    </div>
  )
}


