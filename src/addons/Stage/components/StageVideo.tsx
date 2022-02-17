import { useEffect, useRef } from "react";
import styled from "styled-components";

interface IVideo extends React.HTMLAttributes<HTMLVideoElement> {
	mirrored: boolean;
}

type IVideoParams = {
	video:IVideoTrack | undefined 
	mirrored?:boolean
	className?:string
	id?:string
	Element?:any
} & React.HTMLAttributes<HTMLVideoElement>

const Video = styled.video<IVideo>`
	width: inherit;
	height: inherit;
  display: block;
  object-fit: cover;
  transform: ${props => props.mirrored ? "scaleX(-1)" : "scaleX(1)"};
`

// export const StageVideo:React.FunctionComponent<IVideoParams> = ({ video, mirrored=false, className, id }) => <VideoComponent video={video} mirrored={mirrored} className={className} id={id} Element={Video} />
export const StageDesktop = (props) => <VideoComponent Element={Video} {...props} />

export const StageVideo = (props) => {

	if(props.videoType === "camera") return <VideoComponent Element={Video} {...props} />
	if(props.videoType === "desktop") return <VideoComponent Element={Video} {...props} />
}

//Could be a General Video Element
export const VideoComponent:React.FunctionComponent<IVideoParams> = (props) => {
	const {video, mirrored=false, className, id, Element=Video, ...rest} = props
	
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
		<Element className={className} mirrored={mirrored} id={id} autoPlay={true} ref={myRef} {...rest}></Element>
	);
};