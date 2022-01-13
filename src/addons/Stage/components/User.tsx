import { useEffect, useRef } from "react"
import styled from "styled-components"
import { useLocalStore } from "../../../store/LocalStore"


const Container = styled.div`
	position: absolute;
	width: 300px;
	height: 300px;
	background-color: white;
	top: 30px;
	left: 30px;
`
const Video = styled.video`
	width: 300px; 
  height: 300px;
  /* object-position: 50% 50%; */
  display: block;
  object-fit: cover;
  /* transform: scaleX(-1); */
`

const StageContainer = () => {


}

const LocalUser = () => {
	const localVideo = useLocalStore(store => store.video)
	return <User video={localVideo} />
}

const User = ({video}) => {
	
	const myRef:any = useRef<HTMLVideoElement>()
	console.log("VIDEO element ", video)

	useEffect(() => {
		const el = myRef.current
		let tmpEl = undefined;
		if(video?.containers && video?.containers?.length > 0) {
			tmpEl = video.containers[0]
			if(tmpEl) video?.detach(tmpEl)
		}
    if(video?.containers?.length === 0) video.attach(el)
    return (() => {
      video?.detach(el)
			if(tmpEl) video?.attach(tmpEl)
    })

	}, [video])

	return (
		<Container>
			<Video autoPlay={true} ref={myRef} id="stage_video"></Video>
		</Container>
	)
}

export const StageUser = ({video}) => {
	const myRef:any = useRef<HTMLVideoElement>()

	console.log("USER ", video)
	useEffect(() => {
		const el = myRef.current
		console.log("ELEMEMNT ", el)
		video?.attach(el)

		return(() => {
			video?.detach(el)
		})
	},[video])

	return (
		<Container id="PETER">
			<Video autoPlay={true} ref={myRef} id="stage_video"></Video>
		</Container>
	)

}

export default LocalUser