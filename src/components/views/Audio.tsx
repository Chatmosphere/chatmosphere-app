import React, { useEffect, useRef, useState } from "react";
import { IAudioTrack } from "../../stores/RoomStore";

interface IAudio {
  userId: string;
  track:IAudioTrack
}

const Audio: React.FC<IAudio> = (props) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    console.log("Audio:",{props,audioRef})
    props.track.attach(audioRef.current);
  }, []);

  return (
    <div>
      <audio
        autoPlay={true}
        ref={audioRef}
        className={`remoteTrack audioTrack ${props.userId}audio`}
        id={`${props.userId}audio`}
      />
    </div>
  );
};

export default Audio