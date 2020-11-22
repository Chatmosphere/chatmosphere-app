import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useStore } from './Store/store';

export const User = ({id}) => {

  const myPos = useStore(useCallback(store => store.users[id]['pos'], [id]))
  const myVolume = useStore(useCallback(store => store.users[id]['volume'], [id]))
  const isMute = useStore(store => store.users[id]['mute'])

  return(
    <div style={{position:'absolute', left:`${myPos.x}px`, top:`${myPos.y}px`}} className="userContainer" >
      <VideoTrack id={id} />
      <AudioTrack id={id} volume={myVolume} />
      <div>This is User {id}</div>
      <div>Volume {myVolume}</div>
      <div>User is {isMute ? "Mute" : "Unmuted"}</div>
    </div>
  )
}


const VideoTrack = ({id}) => {

  const videoStyles = {
    background: 'blue',
    // position: 'absolute',
    width: '200px',
    height: '200px',
    objectPosition: '50% 50%',
    display: 'block',
    borderRadius: '100px',
    objectFit: 'cover'
  }

  const videoTrack = useStore(useCallback(store => store.users[id]['video'], [id]))

  const myRef = useRef()

  useEffect(() => {
    const el = myRef.current
    videoTrack?.attach(el)
    return(() => {
      videoTrack?.detach(el)
    })
  },[videoTrack])

  //Fix if Video not shown - reattaching works quite well
  const onVideoClicked = (e) => {
    videoTrack.detach(e.target)
    videoTrack.attach(e.target)
  }

  return (
    <div>
      {videoTrack && <video autoPlay='1' ref={myRef} style={videoStyles} onClick={onVideoClicked} className={`remoteTrack videoTrack ${id}video`} id={`${id}video`} />}
    </div>
  )
}

const AudioTrack = ({id, volume}) => {
  const audioTrack = useStore(useCallback(store => store.users[id]['audio'], [id]))
  const myRef = useRef()

  useEffect(() => {
    myRef.current.volume = volume

  }, [volume])

  useEffect(() => {
    const el = myRef.current
    audioTrack?.attach(el)
    return(() => {
      audioTrack?.detach(el)
    })
  },[audioTrack])

  return (
    <audio autoPlay='1' ref={myRef} className={`remoteTrack audioTrack ${id}audio`} id={`${id}audio`} />
  )
}

