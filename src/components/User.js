import React, { useCallback, useEffect } from 'react';

export const User = ({id, tracks}) => {

  const audioRef = useCallback(node => {
    console.count("CALLBACK CALLED")
    if(node !== null && tracks.audio) {
      tracks.audio.attach(node)
    }
  })
  const videoRef = useCallback(node => {
    if(node !== null && tracks.video) {
      tracks.video.attach(node)
    }
  })

  useEffect(() => {
    console.log("PASSED USER IS ", id)
    console.log("Tracks are ", tracks)
    console.log("in users jsmeet is ", window.JitsiMeetJS)
    // ref not ready here? so the following doesnt work, thats weird
    // if(tracks.video) tracks.video.attach(VideoEl)
    if(tracks.audio) tracks.audio.removeEventListener(window.JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED, onAudioLEvelChanged)
    if(tracks.audio) tracks.audio.addEventListener(window.JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED, onAudioLEvelChanged)
  },[tracks])

  useEffect(() => {
    console.log("Track in Track audio is", tracks.audio)
  },[tracks.audio])

  const onAudioLEvelChanged = (audioLevel) => {
    console.log("Audio level is ", audioLevel)
  }

  return(
    <div>
      This is User {id}
      {tracks.audio && <audio autoPlay='1' ref={audioRef} className="remoteTrack ${id}audio" id='${id}audio' /> }
      {tracks.video && <video autoPlay='1' ref={videoRef} className='remoteTrack ${id}video' id='${id}video' />}
    </div>
  )
}