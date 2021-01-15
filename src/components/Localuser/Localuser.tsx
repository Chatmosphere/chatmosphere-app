import React, { useRef } from "react"
import styled from "styled-components"
import { useLocalStore } from "../../store/LocalStore"
import LocalVideo from "./LocalVideo"
import LocalAudio from "./LocalAudio"
import { MuteIndicator } from "./elements/MuteIndicator"
import { ReloadHint } from "../ReloadHint/ReloadHint"
import { panOptions } from "./../PanWrapper/panOptions"
import { AudioRadius } from "./elements/AudioRadius"
import { NameContainer } from "./elements/NameContainer"

const Container = styled.div`
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


export const Localuser: React.FC<ILocaluser> = () => {

  const audioTrack = useLocalStore((store) => store.audio)
  const videoTrack = useLocalStore((store) => store.video)
  const isMute = useLocalStore((store) => store.mute)

  const localUserNode = useRef<HTMLDivElement>(null)

  return (
    <Container
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
		</Container>
	);
}
