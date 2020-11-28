import * as React from 'react';
import { useCallback, useEffect, useRef } from "react"
import styled from "styled-components"
import { useConferenceStore } from '../Store/ConferenceStore';


const Video = styled.video`
  background: blue;
  width: 200px;
  height: 200px;
  object-position: 50% 50%;
  display: block;
  border-radius: 100px;
  object-fit: cover;
`

export const VideoTrack = ({id}) => {

  const videoTrack:any = useConferenceStore(useCallback(store => store.users[id]['video'], [id]))
  const myRef:any = useRef()

  useEffect(() => {
    const currentElement = myRef.current
    videoTrack?.attach(currentElement)
    return(() => {
      videoTrack?.detach(currentElement)
      videoTrack?.dispose()
    })
  },[videoTrack])

   //Fix if Video not shown - reattaching works quite well
   const onVideoClicked = (e) => {
    videoTrack.detach(e.target)
    videoTrack.attach(e.target)
  }

  return (
    <Video autoPlay={true} ref={myRef} className={`remoteTrack videoTrack ${id}video`} id={`${id}video`} />
  )
}

