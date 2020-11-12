import React, { useEffect, useRef, useState } from "react";
import { IUser } from "../../stores/RoomStore";
import Video from "./Video";
import Audio from "./Audio";


interface IUserComponent extends IUser{
  className?:string
}

const User: React.FC<IUserComponent> = (props) => {
  return (
    <div className={"user "+(props.className||"")}>
      {props.userId}:
      {props.video && <Video userId={props.userId} track = {props.video} />}
      {props.audio && <Audio userId={props.userId} track = {props.audio} />}
    </div>
  );
};

export default User;
