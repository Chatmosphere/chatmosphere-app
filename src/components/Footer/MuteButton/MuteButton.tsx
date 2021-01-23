import React from 'react';
import { Button } from './../../common/Buttons/Button';
import {FaMicrophoneSlash, FaMicrophone} from 'react-icons/fa'
import { useLocalStore } from './../../../store/LocalStore';


export const MuteButton = () => {

  const {toggleMute, mute} = useLocalStore()

  const handleClick = () => {
    toggleMute()
  }

  if(mute) {
    return <Button type="danger" onClick={handleClick}><FaMicrophoneSlash/> Unmute</Button>
  } else {
    return <Button type="secondary" onClick={handleClick}><FaMicrophone/> Mute</Button>
  }
}