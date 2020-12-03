import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';import { useConferenceStore } from '../Store/ConferenceStore';

const Video = styled.video`
  width: 200px; 
  height: 200px;
  object-position: 50% 50%;
  display: block;
  border-radius: 100px;
  object-fit: cover;
`

const LocalVideo = ({track}) => {
  const myRef:any = useRef()
  const room:any = useConferenceStore(store => store.conferenceObject)


  useEffect(()=> {
    const el = myRef.current
    if(track?.containers?.length === 0) track.attach(el)
    return (() => {
      track.detach(el)
      // track.dispose()
    })
  },[track])

  useEffect(() => {
    room?.addTrack(track)
  },[room, track])

  return <Video autoPlay={true} ref={myRef} className={`localTrack videoTrack`} />
}

export default LocalVideo