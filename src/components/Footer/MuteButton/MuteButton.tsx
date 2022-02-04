import React from 'react';
import { Button } from './../../common/Buttons/Button';
import { useLocalStore } from './../../../store/LocalStore';
import MicIcon from '../../../assets/icons/MicIcon';
import MicOff from '../../../assets/icons/MicOff';



export const MuteButton = () => {

  const toggleMute = useLocalStore(store => store.toggleMute)
  const mute = useLocalStore(store => store.mute)

  if(mute) {
    return <Button type="danger" onClick={toggleMute}><MicOff/> Unmute</Button>
  } else {
    return <Button type="secondary" onClick={toggleMute}><MicIcon/> Mute</Button>
  }
}