import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '../connection/store';

export const Localuser: React.FC = ({ videoTrack: any }: any) => {
  const jsMeet: any = useStore((store) => store.jsMeet);
	const [ localTracks, setLocalTracks ] = useState([]);


  
	useEffect(
		() => {
			jsMeet
				.createLocalTracks({ devices: [ 'audio', 'video' ] }, true)
				.then((tracks) => {
          tracks.map((track: any, i) => {
            
						// track.addEventListener(jsMeet.events.track.TRACK_MUTE_CHANGED, on_ego_mute_changed)
						// track.addEventListener(jsMeet.events.track.LOCAL_TRACK_STOPPED, on_local_tracks_stopped)
						// track.addEventListener(jsMeet.events.track.TRACK_AUDIO_OUTPUT_CHANGED, on_local_track_audio_output_changed)
            // track.getType() === 'video' ? setVideoTrack(track) : setAudioTrack(track)
            // track.attach(videoRef.current)
          });
          setLocalTracks(tracks);
          
				})
				.catch((error) => {
					throw error;
				});
		},
		[ jsMeet ]
  );

	return (
		<div>
      {localTracks.map((track:any) => {
        if(track?.getType() === 'video') return <LocalVideo key={track.track.id} track={track} />
        if(track.getType() === 'audio') return <LocalAudio key={track.track.id} track={track} />
      })}
      Video
		</div>
	);
};

const LocalVideo = ({track}) => {
  const myRef:any = useRef()
  const room:any = useStore(store => store.room)

  useEffect(()=> {
    track.attach(myRef.current)
  },[track])

  useEffect(() => {
    room.addTrack(track)
  },[room, track])

  return <video autoPlay={true} ref={myRef} className={`localTrack videoTrack`} />
}


const LocalAudio = ({track}) => {
  const myRef:any = useRef()
  const room:any = useStore(store => store.room)
  const jsMeet:any = useStore(store => store.jsMeet)

  const [audioLevel, setAudioLevel] = useState(0)

  useEffect(() => {
    track.attach(myRef.current)
    track.addEventListener(jsMeet.events.track.TRACK_AUDIO_LEVEL_CHANGED, setAudioLevel)
  },[track])

  useEffect(() => {
    room.addTrack(track)
  },[room,track])

  return <audio autoPlay={true} muted={true} id='localAudio${id}' />
}