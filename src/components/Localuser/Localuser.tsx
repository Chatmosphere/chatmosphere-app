import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {throttle} from 'lodash'
import { Name } from '../User/Name';
import { useConnectionStore } from '../Store/ConnectionStore';
import { useLocalStore } from '../Store/LocalStore';
import { useConferenceStore } from '../Store/ConferenceStore';
import { localTrackOptions } from '../connection/options';

interface IUserContainer {
  readonly isActive :boolean
  readonly pos: {x:number, y:number}
}

const UserContainer = styled.div<IUserContainer>`
  width: 200px;
  height:200px;
  position:absolute;
  border: 4px solid;
  border-radius: 300px;
  left: ${props => props.pos.x}px;
  top: ${props => props.pos.y}px;
  border-color: ${props => props.isActive ? "#9ec9ff"  : "#5a7aa3"}
  `
const AudioRadius = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  border: 2px dotted #CCC;
  width: 1000px;
  height: 1000px;
  display:block;
  border-radius: 500px;
  pointer-events: none;
  background: radial-gradient();
  z-index: -100;
`

export const Localuser: React.FC = () => {
  const { jsMeet } = useConnectionStore()
  const conference = useConferenceStore(state => state.conferenceObject)

  const calculateVolumes = useConferenceStore(store => store.calculateVolumes)
  const pos = useLocalStore(store => store.localPosition)
  const { setLocalPosition, localTracks, setLocalTracks } = useLocalStore()

  const localUserNode = useRef<HTMLDivElement>(null)
  const [myID, setMyID] = useState()
  const [isActive, setActive] = useState(false)
  const clickDelta = useRef({x:0, y:0})
  

  function sendPositionToPeers(pos) {
    conference?.sendCommand("pos", {value:pos})
  }

  const throttledSendPos = throttle(sendPositionToPeers, 200)

  const onDrag = (e) => {
      const xPos = e.clientX - clickDelta.current.x
      const yPos = e.clientY - clickDelta.current.y
      const newPos = JSON.stringify({id:myID, x:xPos, y:yPos})
      throttledSendPos(newPos)
      setLocalPosition({x:xPos, y:yPos})
      calculateVolumes({x:xPos, y:yPos})
      // Still think rerendering is a waste and should be handled with transient updates
      // if(localUserNode.current) localUserNode.current.setAttribute('style', `left:${xPos}px; top:${yPos}px`)
}
  const onUp = () => {
    setActive(false)
    document.removeEventListener('pointerup', onUp)
    document.removeEventListener('pointermove', onDrag)
  }
  const onDown = (e) => {
    e.preventDefault()
    setActive(true)
    const boundingRect = e.currentTarget.getBoundingClientRect()
    clickDelta.current = {x: e.clientX - boundingRect.x, y:e.clientY - boundingRect.y}
    document.addEventListener('pointerup', onUp)
    document.addEventListener('pointermove', onDrag)
  }

  useEffect(()=>{
    if(conference?.myUserId()) setMyID(conference.myUserId())
  },[conference])

	useEffect(() => {
			jsMeet
				?.createLocalTracks(localTrackOptions, true)
				.then(tracks => {setLocalTracks(tracks)})
				.catch(error => {throw error;});
	},[ jsMeet, setLocalTracks ])

	return (
		<UserContainer ref={localUserNode} isActive={isActive} pos={pos} onPointerDown={onDown} className="localUserContainer">
    <AudioRadius></AudioRadius>
      {localTracks.map((track:any) => {
        if(track?.getType() === 'video') return <LocalVideo key={track.track.id} track={track} />
        if(track.getType() === 'audio') return <LocalAudio key={track.track.id} track={track} />
      })}
      <Name>This is You</Name>
		</UserContainer>
	);
}

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


const LocalAudio = ({track}) => {
  const myRef:any = useRef()
  const room:any = useConferenceStore(store => store.conferenceObject)
  const jsMeet:any = useConnectionStore(store => store.jsMeet)

  const [audioLevel, setAudioLevel] = useState(0)

  useEffect(() => {
    const el = myRef.current
    if(track?.containers?.length === 0) track.attach(myRef.current)
    track.addEventListener(jsMeet.events.track.TRACK_AUDIO_LEVEL_CHANGED, setAudioLevel)
    return (() => {
      track.removeEventListener(jsMeet.events.track.TRACK_AUDIO_LEVEL_CHANGED, setAudioLevel)
      track.detach(el)
      // track.dispose()
    })
  },[track])

  useEffect(() => {
    room?.addTrack(track)
  },[room,track])

  return <audio autoPlay={true} muted={true} id='localAudio${id}' />
}