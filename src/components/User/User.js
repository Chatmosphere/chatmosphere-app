import React, { useCallback, useEffect } from 'react';
import { useConferenceStore } from '../../Store/ConferenceStore';
import { ReloadHint } from '../ReloadHint/ReloadHint';
import { AudioTrack } from './AudioTrack';
import { MuteIndicator } from './MuteIndicator';
import { Name } from './Name';
import { VideoTrack } from './VideoTrack';


export const User = ({id, user}) => {

  const myPos = useConferenceStore(useCallback(store => store.users[id]['pos'], [id]))
  const myVolume = useConferenceStore(useCallback(store => store.users[id]['volume'], [id]))
  const isMute = useConferenceStore(useCallback(store => store.users[id]['mute'],[id]))
  const calculateVolume = useConferenceStore(useCallback(store => store.calculateVolume, []))
  useEffect(() => {
    calculateVolume(id)
  },[id, calculateVolume, myPos])

  return(
    <div style={{position:'absolute', left:`${myPos.x}px`, top:`${myPos.y}px`}} className="userContainer" >
      <VideoTrack id={id} />
      <ReloadHint />
      <AudioTrack id={id} volume={myVolume} />
      <Name>{user?.user?._displayName || 'Friendly Sphere'}</Name>
      <div>Volume {Math.round(myVolume * 11)}</div>
      {isMute && <MuteIndicator>🤭</MuteIndicator>}
    </div>
  )
}


