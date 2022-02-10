import { useEffect, useRef } from "react";
import styled from "styled-components";

const Video = styled.video`
	width: 300px; 
  height: 300px;
  /* object-position: 50% 50%; */
  display: block;
  object-fit: cover;
  /* transform: scaleX(-1); */
`

export const ConnectedVideo:React.FunctionComponent<{video:IVideoTrack | undefined, className?:string, id?:string} & React.HTMLAttributes<HTMLVideoElement>> = ({ video, className, id }) => {
	
	const myRef: any = useRef<HTMLVideoElement>();
	
	useEffect(() => {
		const el = myRef.current;
		let tmpEl = undefined;
		if (video?.containers && video?.containers?.length > 0) {
			tmpEl = video.containers[0];
			if (tmpEl)
				video?.detach(tmpEl);
		}
		if (video?.containers?.length === 0)
			video.attach(el);
		return (() => {
			video?.detach(el);
			if (tmpEl)
				video?.attach(tmpEl);
		});
	}, [video]);

	return (
		<Video className={className} id={id} autoPlay={true} ref={myRef}></Video>
	);
};
