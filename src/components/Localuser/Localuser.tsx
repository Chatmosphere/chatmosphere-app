import React, { useCallback, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { useLocalStore } from "../../Store/LocalStore"
import LocalVideo from "./LocalVideo"
import LocalAudio from "./LocalAudio"
import { MuteIndicator } from "./MuteIndicator"
import { ReloadHint } from "../ReloadHint/ReloadHint"
import { panOptions } from "../PanHandler/panOptions"
import { AudioRadius } from "./AudioRadius"
import { NameContainer } from "./NameContainer"

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
  width: ${panOptions.user.size.x}px;
  height: ${panOptions.user.size.y}px;
  position: absolute;
  border: 4px solid;
  border-radius: 300px;
`

interface ILocaluser {
  // panChanged: (callback: (params) => void) => void
}

export const Localuser: React.FC<ILocaluser> = (props) => {

  const pos = useLocalStore((store) => store.pos)
  const audioTrack = useLocalStore((store) => store.audio)
  const videoTrack = useLocalStore((store) => store.video)
  const isMute = useLocalStore((store) => store.mute)
  const zoomTransformPan = useLocalStore(store => store.pan)
  const zoomTransformScale = useLocalStore(store => store.scale)
  const setLocalPosition = useLocalStore(store => store.setLocalPosition)

  const localUserNode = useRef<HTMLDivElement>(null)

  const [isActive, setActive] = useState(false)
  const clickDelta = useRef({ x: 0, y: 0 })

  const onDrag = (e) => {
    const scale = zoomTransformScale
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
    const scale = zoomTransformScale //boundingRect.width/userWidth
    clickDelta.current = {
      x: (e.clientX - boundingRect.x + zoomTransformPan.x) / scale,
      y: (e.clientY - boundingRect.y + zoomTransformPan.y) / scale,
    }

    document.addEventListener("pointerup", onUp)
    document.addEventListener("pointermove", onDrag)
  }

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
      <NameContainer />
		</DynamicUserContainer>
	);
}
