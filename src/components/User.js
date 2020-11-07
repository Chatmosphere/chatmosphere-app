import React, { useCallback, useEffect } from 'react';
import { useStore } from './connection/store';

export const User = ({id}) => {

  const audioRef = useCallback(node => {
    console.count("CALLBACK CALLED")
    if(node !== null) {
      audioTrack.attach(node)
    }
  })
  const videoRef = useCallback(node => {
    if(node !== null) {
      videoTrack.attach(node)
    }
  })

  const audioTrack = useStore(useCallback(store => store.users[id]['audio'], [id]))
  const videoTrack = useStore(useCallback(store => store.users[id]['video'], [id]))
  
  useEffect(() => {
    console.log("PASSED USER IS ", id)
    console.log("in users jsmeet is ", window.JitsiMeetJS)
    // ref not ready here? so the following doesnt work, thats weird; adding refCallbacks at line 6 works
    // if(tracks.video) tracks.video.attach(VideoEl)
  },[videoTrack])
  
  useEffect(() => {
    if(audioTrack !== undefined) {
      audioTrack.removeEventListener(window.JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED, onAudioLEvelChanged)
      audioTrack.addEventListener(window.JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED, onAudioLEvelChanged)
      audioTrack.removeEventListener(window.JitsiMeetJS.events.track.TRACK_MUTE_CHANGED, () => console.log('remote track muted')) //maybe there'S an error thrown because jitsi holds a reference of the track on participant disconnect
      audioTrack.addEventListener(window.JitsiMeetJS.events.track.TRACK_MUTE_CHANGED, () => console.log('remote track muted')) //maybe there'S an error thrown because jitsi holds a reference of the track on participant disconnect
    }
  },[audioTrack])

  const onAudioLEvelChanged = (audioLevel) => {
    // console.log("Audio level is ", audioLevel)
  }

  return(
    <div>
      This is User {id}
      {audioTrack && <audio autoPlay='1' ref={audioRef} className="remoteTrack ${id}audio" id='${id}audio' /> }
      {videoTrack && <video autoPlay='1' ref={videoRef} className='remoteTrack ${id}video' id='${id}video' />}
    </div>
  )
}