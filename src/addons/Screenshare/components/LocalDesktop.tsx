import { memo, useEffect, useRef } from "react"
import styled from "styled-components"
import { useConferenceStore } from "../../../store/ConferenceStore"

const StyledVideo = styled.video`
  width: auto; 
  height: 200px;
  /* object-position: 50% 50%; */
  display: block;
	transform: translateX(0%);
  /* object-fit: cover; */
`

const LocalDesktop:React.FC<{track:IVideoTrack}> = memo(({track}) => {
  const myRef:any = useRef()
  const room = useConferenceStore(store => store.conferenceObject)


  useEffect(()=> {
    const el = myRef.current
    if(track?.containers?.length === 0) track.attach(el)
    return (() => {
      track.detach(el)
      // track.dispose() //if we dispose, track replacement doesnt work anymore
    })
  },[track])

  useEffect(() => {
    room?.addTrack(track)
      .catch(error => {});//the track might have been added already, handle the promise error
  },[room, track])

  return <StyledVideo autoPlay={true} ref={myRef} className={`localTrack desktopTrack`} />
})

export default LocalDesktop