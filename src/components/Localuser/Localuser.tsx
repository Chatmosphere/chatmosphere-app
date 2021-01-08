import React, { useRef, useState } from "react"
import styled from "styled-components"
import { useLocalStore } from "../../Store/LocalStore"
import LocalVideo from "./LocalVideo"
import LocalAudio from "./LocalAudio"
import { MuteIndicator } from "./MuteIndicator"
import { ReloadHint } from "../ReloadHint/ReloadHint"
import { panOptions } from "../PanHandler/panOptions"
import { AudioRadius } from "./AudioRadius"
import { NameContainer } from "./NameContainer"
import DragHandler from "../../utils/DragHandler/DragHandler"

interface IUserContainer {
  readonly isActive: boolean
  readonly pos: { x: number; y: number }
}

const DynamicUserContainer = styled.div`
  width: ${panOptions.user.size.x}px;
  height: ${panOptions.user.size.y}px;
  position: absolute;
  border: 4px solid;
  border-radius: 300px;
  cursor: default;
  &:active {
    cursor: default;
  }
`

interface ILocaluser {
  // panChanged: (callback: (params) => void) => void
}

export const Localuser: React.FC<ILocaluser> = (props) => {

  const pos = useLocalStore(store => store.pos)
  const audioTrack = useLocalStore((store) => store.audio)
  const videoTrack = useLocalStore((store) => store.video)
  const isMute = useLocalStore((store) => store.mute)
  const zoomTransformPan = useLocalStore(store => store.pan)
  const zoomTransformScale = useLocalStore(store => store.scale)
  const setLocalPosition = useLocalStore(store => store.setLocalPosition)

  const localUserNode = useRef<HTMLDivElement>(null)

  return (
    <DragHandler initPos={pos} currentScale={zoomTransformScale} panOffset={zoomTransformPan} callback={setLocalPosition}>
    <DynamicUserContainer
      ref={localUserNode}
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
    </DragHandler>
	);
}
