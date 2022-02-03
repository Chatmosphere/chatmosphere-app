import * as React from 'react';
import { useEffect, useRef } from "react"
import styled from "styled-components"
import { useLocalStore } from './../../store/LocalStore';


const Video = styled.video`
  background: red;
  width: 200px;
  height: 200px;
  object-position: 50% 50%;
  display: block;
  border-radius: 100px;
  object-fit: cover;
  transform: scaleX(1);
`

export const VideoContainer = styled.div`
  width: 400px;
  height: 200px;
  border-radius: 100px;
`

export const DesktopVideo:React.FC<{user:IUser}> = React.memo(({user}) => {

  const videoTrack = user?.video
  const myRef:any = useRef()

  const localVideoTrack = useLocalStore((store) => store.video)

  //For some reason; when camera permission is not granted yet, not only the local video track, but also the remote video tracks aren't rendered.
  //The solution is to reattach the remote tracks once local track is available.
  useEffect(() => {
    const currentElement = myRef.current
    if(videoTrack) {
      videoTrack.attach(currentElement)
    }
    return(() => {
      videoTrack?.detach(currentElement)
    })
  },[videoTrack, localVideoTrack])

  return (
    <div>
      <Video autoPlay={true} ref={myRef} className={`remoteTrack desktopTrack ${user.id}video`} id={`${user.id}desktop`} />
    </div>
  )
})