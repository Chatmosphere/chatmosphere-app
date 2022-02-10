import styled from "styled-components"
import { useLocalStore } from "../../../store/LocalStore"
import { ConnectedAudio } from "./ConnectedAudio"
import { ConnectedVideo } from "./ConnectedVideo"


const Container = styled.div`
	/* position: absolute; */
	width: 300px;
	height: 300px;
	background-color: white;
	border-radius: 10px;
	overflow: hidden;
	box-shadow: 0px 24px 48px 0px rgba(0, 0, 0, 0.25);
`

export const User = ({video, audio}) => {
	return (
		<Container>
			<ConnectedAudio audio={audio} volume={0.8} />
			<ConnectedVideo className="stage_video" video={video} />
		</Container>
	)
}

export const LocalUser = () => {
	const localVideo = useLocalStore(store => store.video)
	const videoType = useLocalStore(store => store.videoType)
	return (
		<Container>
			{(localVideo && videoType === "camera" ) && <ConnectedVideo mirrored id="local_video" video={localVideo} />}
			{(localVideo && videoType === "desktop" ) && <ConnectedVideo id="local_video" video={localVideo} />}
		</Container>
	)
}