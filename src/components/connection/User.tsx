import React, { useEffect, useRef, useState } from 'react';
import RoomStore, { IUser } from '../../stores/RoomStore';
import { conferenceName, conferenceOptions, jitsiInitOptions } from './options';

const User:React.FC<IUser> = (props) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  return (
    <div>
      {props.audio && <audio autoPlay={true} ref={audioRef} className={`remoteTrack audioTrack ${props.userId}audio`} id={`${props.userId}audio`} />}     
    </div>
  )
}


export default User