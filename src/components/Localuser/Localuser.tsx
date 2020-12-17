import React, { useCallback, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { Name } from "../User/Name"
import { useLocalStore } from "../../Store/LocalStore"
import { useConferenceStore } from "../../Store/ConferenceStore"
import LocalVideo from "./LocalVideo"
import LocalAudio from "./LocalAudio"
import { localTrackOptions, transformWrapperOptions } from "../JitsiConnection/options"
import { MuteIndicator } from "./MuteIndicator"
import { ReloadHint } from "../ReloadHint/ReloadHint"

interface IUserContainer {
  readonly isActive: boolean
  readonly pos: { x: number; y: number }
}

const DynamicUserContainer = styled.div.attrs(
  ({ pos, isActive }: IUserContainer) => ({
    style: {
      left: `${pos.x}px`,
      top: `${pos.y}px`,
      borderColor: `${isActive ? "#9ec9ff" : "#5a7aa3"}`,
    },
  }),
)<IUserContainer>`
  width: ${localTrackOptions.user.size.x}px;
  height: ${localTrackOptions.user.size.y}px;
  position: absolute;
  border: 4px solid;
  border-radius: 300px;
`

const AudioRadius = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  border: 2px dotted #ccc;
  width: 1000px;
  height: 1000px;
  display: block;
  border-radius: 500px;
  pointer-events: none;
  background: radial-gradient();
  z-index: -100;
`
interface ILocaluser {
  panChanged: (callback: (params) => void) => void
}

export const Localuser: React.FC<ILocaluser> = (props) => {
  const conference = useConferenceStore((state) => state.conferenceObject)

  const pos = useLocalStore((store) => store.pos)
  const myId = useLocalStore((store) => store.id)
  const audioTrack = useLocalStore((store) => store.audio)
  const videoTrack = useLocalStore((store) => store.video)
  const { setLocalPosition } = useLocalStore()
  const isMute = useLocalStore((store) => store.mute)

  const localUserNode = useRef<HTMLDivElement>(null)

  const [isActive, setActive] = useState(false)
  const [zoomTransform, setZoomTransform] = useState({
    pan: { x: transformWrapperOptions.defaultPositionX||0, y: transformWrapperOptions.defaultPositionY||0 },
    scale: transformWrapperOptions.scale||1,
  })
  const clickDelta = useRef({ x: 0, y: 0 })

  const onDrag = (e) => {
    const scale = zoomTransform.scale
    const xPos = e.clientX / scale - clickDelta.current.x
    const yPos = e.clientY / scale - clickDelta.current.y
    setLocalPosition({ x: xPos, y: yPos })
    
    // Still think rerendering is a waste and should be handled with transient updates
    // if(localUserNode.current) localUserNode.current.setAttribute('style', `left:${xPos}px; top:${yPos}px`)
  }

  const onUp = () => {
    setActive(false)
    document.removeEventListener("pointerup", onUp)
    document.removeEventListener("pointermove", onDrag)
  }

  const onDown = (e) => {
    e.preventDefault()
    setActive(true)
    const boundingRect = e.currentTarget.getBoundingClientRect()
    console.log("onDown:", zoomTransform)
    const scale = zoomTransform.scale //boundingRect.width/userWidth
    clickDelta.current = {
      x: (e.clientX - boundingRect.x + zoomTransform.pan.x) / scale,
      y: (e.clientY - boundingRect.y + zoomTransform.pan.y) / scale,
    }

    document.addEventListener("pointerup", onUp)
    document.addEventListener("pointermove", onDrag)
  }
  props.panChanged((params) => {
    setZoomTransform({
      scale: params.scale,
      pan: { x: params.positionX, y: params.positionY },
    })
  })

  return (
    <DynamicUserContainer
      ref={localUserNode}
      isActive={isActive}
      pos={pos}
      onPointerDown={onDown}
      className="localUserContainer"
    >
      <AudioRadius></AudioRadius>
      {videoTrack && (
        <LocalVideo key={videoTrack.track.id} track={videoTrack} />
      )}
      <ReloadHint />
      {audioTrack && (
        <LocalAudio key={audioTrack.track.id} track={audioTrack} />
      )}
      {isMute && <MuteIndicator>🤭</MuteIndicator>}
      <Name>This is You</Name>
    </DynamicUserContainer>
  )
}
