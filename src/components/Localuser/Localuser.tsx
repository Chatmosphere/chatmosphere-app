import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useStore } from './../Store/store';
import {throttle} from 'lodash'


const UserContainer = styled.div`
  width: 200px;
  position:absolute;
`

export const Localuser: React.FC = () => {
  const jsMeet: any = useStore((store) => store.jsMeet);
  const room = useStore(store => store.room)
  const calculateVolumes = useStore(store => store.calculateVolumes)
  const setLocalPos = useStore(store => store.setLocalPos)
  // const [ localTracks, setLocalTracks ] = useState([]);
  const localTracks = useStore(store => store.localTracks)
  const setLocalTracks = useStore(store => store.setLocalTracks)
  const localUserNode = useRef<HTMLDivElement>(null)
  const [myID, setMyID] = useState()
  
  const clickDelta = useRef({x:0, y:0})
  const active:any = useRef(false)

  function sendPositionToPeers(pos) {
    room.sendCommand("pos", {value:pos})
  }

  const throttledSendPos = throttle(sendPositionToPeers, 200)

  const onDrag = (e) => {
    if(active.current === true && localUserNode.current !== null) {
      const xPos = e.clientX - clickDelta.current.x
      const yPos = e.clientY - clickDelta.current.y
      const newPos = JSON.stringify({id:myID, x:xPos, y:yPos})
      throttledSendPos(newPos)
      setLocalPos({x:xPos, y:yPos})
      calculateVolumes({x:xPos, y:yPos})
      // sendPositionToPeers(newPos)
      // room.setLocalParticipantProperty('pos', `{x:${xPos}, y:${yPos}}`)
      localUserNode.current.setAttribute('style', `left:${xPos}px; top:${yPos}px`)
  }
}
  const onUp = () => {
    active.current = false
    document.removeEventListener('pointerup', onUp)
    document.removeEventListener('pointermove', onDrag)
  }
  const onDown = (e) => {
    e.preventDefault()
    active.current = true
    const boundingRect = e.currentTarget.getBoundingClientRect()
    clickDelta.current = {x: e.clientX - boundingRect.x, y:e.clientY - boundingRect.y}
    document.addEventListener('pointerup', onUp)
    document.addEventListener('pointermove', onDrag)
  }

  useEffect(()=>{
    if(room?.myUserId()) setMyID(room.myUserId())
  },[room])

	useEffect(
		() => {
			jsMeet
				.createLocalTracks({ devices: [ 'audio', 'video' ] }, true)
				.then(tracks => {setLocalTracks(tracks)})
				.catch(error => {throw error;});
	},[ jsMeet ])

	return (
		<UserContainer ref={localUserNode} onPointerDown={onDown} className="localUserContainer">
      {localTracks.map((track:any) => {
        if(track?.getType() === 'video') return <LocalVideo key={track.track.id} track={track} />
        if(track.getType() === 'audio') return <LocalAudio key={track.track.id} track={track} />
      })}
      This is You
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
  const room:any = useStore(store => store.room)


  useEffect(()=> {
    const el = myRef.current
    if(track?.containers?.length === 0) track.attach(el)
    return (() => {
      // track.detach(el)
      track.dispose()
    })
  },[track])

  useEffect(() => {
    room.addTrack(track)
  },[room, track])

  return <Video autoPlay={true} ref={myRef} className={`localTrack videoTrack`} />
}


const LocalAudio = ({track}) => {
  const myRef:any = useRef()
  const room:any = useStore(store => store.room)
  const jsMeet:any = useStore(store => store.jsMeet)

  const [audioLevel, setAudioLevel] = useState(0)

  useEffect(() => {
    const el = myRef.current
    if(track?.containers?.length === 0) track.attach(myRef.current)
    track.addEventListener(jsMeet.events.track.TRACK_AUDIO_LEVEL_CHANGED, setAudioLevel)
    return (() => {
      track.removeEventListener(jsMeet.events.track.TRACK_AUDIO_LEVEL_CHANGED, setAudioLevel)
      // track.detach(el)
      track.dispose()
    })
  },[track])

  useEffect(() => {
    room.addTrack(track)
  },[room,track])

  return <audio autoPlay={true} muted={true} id='localAudio${id}' />
}