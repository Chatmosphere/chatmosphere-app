import React, { memo, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useConferenceStore } from './../../store/ConferenceStore';

const Video = styled.video`
  width: 200px; 
  height: 200px;
  object-position: 50% 50%;
  display: block;
  border-radius: 100px;
  object-fit: cover;
  transform: scaleX(-1);
`

const LocalVideo:React.FC<{track:IVideoTrack}> = memo(({track}) => {
  const myRef:any = useRef()
  const room = useConferenceStore(store => store.conferenceObject)


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
      .catch(error => {});//the track might have been added already, handle the promise error
  },[room, track])

  return <Video autoPlay={true} ref={myRef} className={`localTrack videoTrack`} />
})

export default LocalVideo