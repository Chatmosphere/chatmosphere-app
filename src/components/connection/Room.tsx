import React, { useEffect, useRef, useState } from 'react';
import RoomStore from '../../stores/RoomStore';
import { conferenceName, conferenceOptions, jitsiInitOptions } from './options';
import User from './User';

const Room:React.FC = (props) => {
  const roomStore = RoomStore.useStore()
  useEffect(()=>{
  // roomStore.joinRoom("conference2")
  },[])
  return (
    <div>
      {roomStore.room&& Object.keys(roomStore.room.users).map((id) => 
            <User key={id} {...roomStore.room.users[id]}/>
      )}
    </div>
  )
}


export default Room