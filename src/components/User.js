import React, { useCallback, useEffect } from 'react';
import { useStore } from './connection/store';

export const User = ({id}) => {

  const audioRef = useCallback(node => {
    console.count("CALLBACK CALLED")
    if(node !== null ) {
      if(audioTrack.containers.length === 0) {
        audioTrack.attach(node)
      }
      console.log("TestReturn is :::::: ", audioTrack)
    }
  })
  const videoRef = useCallback(node => {
    if(node !== null) {
      if(videoTrack.containers.length === 0) {
        videoTrack.attach(node)
      }
      console.log("TestReturn is :::::: ", videoTrack)
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

  //Fix Video not shown - reattaching works quite well
  const onVideoClicked = (e) => {
    videoTrack.detach(e.target)
    videoTrack.attach(e.target)
    console.log(e.target)
  }

  return(
    <div>
      This is User {id}
      {audioTrack && <audio autoPlay='1' ref={audioRef} className={`remoteTrack audioTrack ${id}audio`} id={`${id}audio`} /> }
      {/* {videoTrack && <video autoPlay='1' ref={videoRef} onClick={onVideoClicked} className={`remoteTrack videoTrack ${id}video`} id={`${id}video`} />} */}
      <VideoTrack id={id} />
    </div>
  )
}

const VideoTrack = ({id}) => {

  const videoStyles = {
    background: 'blue'
  }

  const videoTrack = useStore(useCallback(store => store.users[id]['video'], [id]))

  const myRef = useCallback(node => {
    if(node !== null) {
      if(videoTrack.containers.length === 0) {
        videoTrack.attach(node)
      }
    }
  })

  const onVideoClicked = (e) => {
    videoTrack.detach(e.target)
    videoTrack.attach(e.target)
    console.log(e.target)
  }

  return (
    <div>
      {videoTrack && <video autoPlay='1' ref={myRef} style={videoStyles} onClick={onVideoClicked} className={`remoteTrack videoTrack ${id}video`} id={`${id}video`} />}
    </div>
  )
}