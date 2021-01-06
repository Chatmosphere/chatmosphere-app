import React, { useEffect, useRef, useState } from 'react';
import { useConnectionStore } from '../../Store/ConnectionStore';
import { AudioTrack, useConferenceStore } from '../../Store/ConferenceStore';

const LocalAudio:React.FC<{track:AudioTrack}> = ({track}) => {
  const myRef:any = useRef()
  const room = useConferenceStore(store => store.conferenceObject)
  const jsMeet = useConnectionStore(store => store.jsMeet)

  const [audioLevel, setAudioLevel] = useState(0)

  useEffect(() => {
    const el = myRef.current
    if(track?.containers?.length === 0) track.attach(myRef.current)
    track.addEventListener(jsMeet?.events.track.TRACK_AUDIO_LEVEL_CHANGED, setAudioLevel)
    return (() => {
      track.removeEventListener(jsMeet?.events.track.TRACK_AUDIO_LEVEL_CHANGED, setAudioLevel)
      track.detach(el)
      // track.dispose()
    })
  },[track])

  useEffect(() => {
    room?.addTrack(track)
  },[room,track])

  return <audio autoPlay={true} muted={true} id='localAudio${id}' />
}

export default LocalAudio