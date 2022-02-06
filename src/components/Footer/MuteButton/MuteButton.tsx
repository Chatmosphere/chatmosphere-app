import React from 'react';
import { Button, IconButton } from './../../common/Buttons/Button';
import { useLocalStore } from './../../../store/LocalStore';
import MicIcon from '../../../assets/icons/MicIcon';
import MicOff from '../../../assets/icons/MicOff';



export const MuteButton = () => {

  const toggleMute = useLocalStore(store => store.toggleMute)
  const mute = useLocalStore(store => store.mute)

  if(mute) {
    return <IconButton danger onClick={toggleMute} IconStart={<MicOff/>}>Unmute</IconButton>
  } else {
    return <IconButton small onClick={toggleMute} IconStart={<MicIcon/>}>Mute</IconButton>
  }
}