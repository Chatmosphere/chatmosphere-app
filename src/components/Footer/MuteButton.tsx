import React from 'react';
import { Button } from '../common/Buttons/Button';
import {FaMicrophoneSlash, FaMicrophone} from 'react-icons/fa'
import { useLocalStore } from '../../store/LocalStore';


export const MuteButton = () => {

  const {toggleMute, mute} = useLocalStore()

  const handleClick = () => {
    toggleMute()
  }

  if(mute) {
    return <Button danger onClick={handleClick}><FaMicrophoneSlash/> Unmute</Button>
  } else {
    return <Button onClick={handleClick}><FaMicrophone/> Mute</Button>
  }
}