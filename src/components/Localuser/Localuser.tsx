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
import { MegaphoneIndicator } from "../User/MegaphoneIndicator"

const Container = styled.div`
  width: ${panOptions.user.size.x}px;
  height: ${panOptions.user.size.y}px;
  position: absolute;
  border: 4px solid #D9DBEB;
  border-radius: 300px;
  cursor: default;
  &:active {
    cursor: default;
  }
`

interface ILocaluser {
  // panChanged: (callback: (params) => void) => void
  audioRadius?: boolean
}


export const Localuser: React.FC<ILocaluser> = ({audioRadius = false}) => {

  const audioTrack = useLocalStore((store) => store.audio)
  const videoTrack = useLocalStore((store) => store.video)
  const isMute = useLocalStore((store) => store.mute)
  const megaphone = useLocalStore((store) => store.megaphone)

  const localUserNode = useRef<HTMLDivElement>(null)

  return (
    <Container
      ref={localUserNode}
    >
      {audioRadius && <AudioRadius></AudioRadius>}
      {videoTrack && (
        <LocalVideo key={videoTrack.track.id} track={videoTrack} />
      )}
      <ReloadHint />
      {audioTrack && (
        <LocalAudio key={audioTrack.track.id} track={audioTrack} />
      )}
      {isMute && <MuteIndicator />}
      {megaphone && <MegaphoneIndicator />}
      <NameContainer />
		</Container>
	);
}
