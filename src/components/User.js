import React, { useCallback, useEffect } from 'react';

export const User = ({id, tracks}) => {

  const audioRef = useCallback(node => {
    console.count("CALLBACK CALLED")
    if(node !== null) {
      tracks.audio.attach(node)
    }
  })
  const videoRef = useCallback(node => {
    if(node !== null) {
      tracks.video.attach(node)
    }
  })

  useEffect(() => {
    console.log("PASSED USER IS ", id)
    console.log("Tracks are ", tracks)
    console.log("in users jsmeet is ", window.JitsiMeetJS)
    // ref not ready here? so the following doesnt work, thats weird
    // if(tracks.video) tracks.video.attach(VideoEl)
  },[tracks.video])
  
  useEffect(() => {
    if(tracks.audio) {
      tracks.audio.removeEventListener(window.JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED, onAudioLEvelChanged)
      tracks.audio.addEventListener(window.JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED, onAudioLEvelChanged)
      tracks.audio.removeEventListener(window.JitsiMeetJS.events.track.TRACK_MUTE_CHANGED, () => console.log('remote track muted')) //maybe there'S an error thrown because jitsi holds a reference of the track on participant disconnect
      tracks.audio.addEventListener(window.JitsiMeetJS.events.track.TRACK_MUTE_CHANGED, () => console.log('remote track muted')) //maybe there'S an error thrown because jitsi holds a reference of the track on participant disconnect
    }
  },[tracks.audio])

  const onAudioLEvelChanged = (audioLevel) => {
    // console.log("Audio level is ", audioLevel)
  }

  return(
    <div>
      This is User {id}
      {tracks.audio && <audio autoPlay='1' ref={audioRef} className="remoteTrack ${id}audio" id='${id}audio' /> }
      {tracks.video && <video autoPlay='1' ref={videoRef} className='remoteTrack ${id}video' id='${id}video' />}
    </div>
  )
}