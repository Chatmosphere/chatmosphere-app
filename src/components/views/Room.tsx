import React, { useEffect, useRef, useState } from 'react';
import ConnectionStore from '../../stores/ConnectionStore';
import RoomStore from '../../stores/RoomStore';
import { conferenceName, conferenceOptions, jitsiInitOptions } from '../connection/options';
import User from './User';

const Room:React.FC = (props) => {
  const connectionStore = ConnectionStore.useStore()
  const roomStore = RoomStore.useStore()
  useEffect(()=>{
    if(connectionStore.connected)roomStore.joinRoom("conference2")
  },[connectionStore.connected])
  return (
    <div>
      {console.log("Room.roomStore:",roomStore)}
      {roomStore.room&&roomStore.room.egoUser&&<User className="ego" {...roomStore.room.egoUser}/>}
      {roomStore.room && Object.keys(roomStore.room.users).map((id) => 
            <User key={id} {...roomStore.room.users[id]}/>
      )}
    </div>
  )
}


export default Room