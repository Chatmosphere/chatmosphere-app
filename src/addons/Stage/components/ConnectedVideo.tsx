import { useEffect, useRef } from "react";
import styled from "styled-components";

interface IVideo extends React.HTMLAttributes<HTMLVideoElement> {
	mirrored: boolean;
}

const Video = styled.video<IVideo>`
	width: 300px; 
  height: 300px;
  /* object-position: 50% 50%; */
  display: block;
  object-fit: cover;
  transform: ${props => props.mirrored ? "scaleX(-1)" : "scaleX(1)"};
`

export const ConnectedVideo:React.FunctionComponent<{video:IVideoTrack | undefined, mirrored?:boolean, className?:string, id?:string} & React.HTMLAttributes<HTMLVideoElement>> = ({ video, mirrored=false, className, id }) => {
	
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
		<Video className={className} mirrored={mirrored} id={id} autoPlay={true} ref={myRef}></Video>
	);
};
