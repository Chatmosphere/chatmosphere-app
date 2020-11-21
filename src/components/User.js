import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useStore } from './connection/store';

export const User = ({id}) => {

  const audioRef = useCallback(node => {
    console.count("CALLBACK CALLED")
    if(node !== null ) {
      if(audioTrack.containers.length === 0) {
        audioTrack.attach(node)
      }
    }
  })

  const audioTrack = useStore(useCallback(store => store.users[id]['audio'], [id]))
  const videoTrack = useStore(useCallback(store => store.users[id]['video'], [id]))
  const isMute = useStore(store => store.users[id]['mute'])
  const colog = useStore(state => state.colog)
  const [pos, setPos] = useState({x:0, y:0})

  const clickDelta = useRef({x:0, y:0})
  const active = useRef(false)
  const myElement = useRef()

  useEffect(() => {
  }, [myElement.current])

  const setDelta = (pos) => {
    clickDelta.current = pos
  }

  useEffect(() => {
    // ref not ready here? so the following doesnt work, thats weird; adding refCallbacks at line 6 works
    // if(tracks.video) tracks.video.attach(VideoEl)
  },[videoTrack])
  
  useEffect(() => {
    if(audioTrack !== undefined) {
      audioTrack.addEventListener(window.JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED, onAudioLEvelChanged)
      audioTrack.addEventListener(window.JitsiMeetJS.events.track.TRACK_MUTE_CHANGED, () => console.log('remote mute changed')) //maybe there'S an error thrown because jitsi holds a reference of the track on participant disconnect
    }
    return (audioTrack)=>{
      audioTrack?.removeEventListener(window.JitsiMeetJS.events.track.TRACK_MUTE_CHANGED, () => console.log('remote mute changed')) //maybe there'S an error thrown because jitsi holds a reference of the track on participant disconnect
      audioTrack?.removeEventListener(window.JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED, onAudioLEvelChanged)
    }
  },[audioTrack])

  const onAudioLEvelChanged = (audioLevel) => {
    // console.log("Audio level is ", audioLevel)
  }

  const onDrag = (e) => {
    // if(active.current === true) setPos({x:e.clientX - clickDelta.current.x, y:e.clientY - clickDelta.current.y})

    //without rerendering - better I guess - does yusufs lib offers a no-update-solution?
    if(active.current === true && myElement.current !== undefined) {
      const xPos = e.clientX - clickDelta.current.x
      const yPos = e.clientY - clickDelta.current.y
      const myStyle = {
        transform: `translate3d(${xPos}px, ${yPos}px,0)`,
        width: '200px'
      }
      myElement.current.setAttribute('style', `transform:translate3d(${xPos}px, ${yPos}px,0)`)
      // myElement.current.setAttribute('style', myStyle)
    }  
  }

  const onDown = (e) => {
    e.preventDefault()
    active.current = true
    const boundingRect = e.currentTarget.getBoundingClientRect()
    setDelta({x: e.clientX - boundingRect.x, y:e.clientY - boundingRect.y}) 
    document.addEventListener('pointerup', onUp)
    document.addEventListener('pointermove', onDrag)
  }
  const onUp = (e) => {
    active.current = false
    document.removeEventListener('pointerup', onUp)
    document.removeEventListener('pointermove', onDrag)
  }

  return(
    <div ref={myElement} style={{transform:`translate3d(${pos.x}px, ${pos.y}px,0)`}} onPointerDown={onDown} className="userContainer" >
      This is User {id}
      User is {isMute ? "Mute" : "Unmuted"}  
      {audioTrack && <audio autoPlay='1' ref={audioRef} className={`remoteTrack audioTrack ${id}audio`} id={`${id}audio`} /> }
      {/* {videoTrack && <video autoPlay='1' ref={videoRef} onClick={onVideoClicked} className={`remoteTrack videoTrack ${id}video`} id={`${id}video`} />} */}
      <VideoTrack id={id} />
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
    videoTrack?.attach(myRef.current)
    return(() => {
      videoTrack?.detach(myRef.current)
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

const AudioTrack = () => null