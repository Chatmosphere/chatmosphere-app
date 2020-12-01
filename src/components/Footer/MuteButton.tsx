import React from 'react';
import styled from 'styled-components';
import { useLocalStore } from '../Store/LocalStore';

interface IButton {
  readonly mute:boolean
}

const Button = styled.button<IButton>`
  padding: 5px;
  font-size: 1rem;
  font-weight: bold;
  color: ${props => props.mute ? 'red' : '#333'};
`

export const MuteButton = () => {

  const {toggleMute, mute} = useLocalStore()

  const handleClick = () => {
    toggleMute()
  }

  return (
  <Button mute={mute} onClick={handleClick}>{mute && "😜 - Unmute" || "🤭 - Mute"}</Button>
  )
}