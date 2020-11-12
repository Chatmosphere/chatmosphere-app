import React, { useEffect, useRef, useState } from "react";
import { IVideoTrack } from "../../stores/RoomStore";

interface IVideo {
  userId: string;
  track:IVideoTrack
}

const Video: React.FC<IVideo> = (props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    console.log("video:",{props,videoRef})
    props.track.attach(videoRef.current);
  }, []);

  return (
    <div>
      <video
       width={300}
       height={300}
        autoPlay={true}
        ref={videoRef}
        className={`videoTrack ${props.userId}video`}
        id={`${props.userId}video`}
      >
        {/* <source src={"source.mp4"} type="video/mp4" /> */}
      </video>
    </div>
  );
};

export default Video;
