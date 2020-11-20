import React, { useEffect, useRef, useState } from "react";
import ConnectionStore from "../../stores/ConnectionStore";
import RoomStore from "../../stores/RoomStore";
import {
  conferenceName,
  conferenceOptions,
  jitsiInitOptions,
} from "../connection/options";
import User from "./User";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const Room: React.FC = (props) => {
  const connectionStore = ConnectionStore.useStore();
  const roomStore = RoomStore.useStore();
  useEffect(() => {
    if (connectionStore.connected) roomStore.joinRoom("conference2");
  }, [connectionStore.connected]);
  return (
    //This transformer works when the child (room) size is bigger than the parent (browser window)
    <TransformWrapper>
      <TransformComponent>
        <div className="room">
          {/* {console.log("Room.roomStore:",roomStore)} */}
          {roomStore.room && roomStore.room.egoUser && (
            <User className="ego" {...roomStore.room.egoUser} />
          )}
          {roomStore.room && roomStore.room.egoUser && (
            <User className="ego" {...roomStore.room.egoUser} />
          )}
          {roomStore.room &&
            Object.keys(roomStore.room.users).map((id) => (
              <User key={id} {...roomStore.room.users[id]} />
            ))}
        </div>
      </TransformComponent>
    </TransformWrapper>
  );
};

export default Room;
