import { useEffect, useRef } from "react"
import styled from "styled-components"
import { useLocalStore } from "../../../store/LocalStore"


const Container = styled.div`
	/* position: absolute; */
	width: 300px;
	height: 300px;
	background-color: white;
	border-radius: 10px;
	overflow: hidden;
	box-shadow: 0px 24px 48px 0px rgba(0, 0, 0, 0.25);
`
const Video = styled.video`
	width: 300px; 
  height: 300px;
  /* object-position: 50% 50%; */
  display: block;
  object-fit: cover;
  /* transform: scaleX(-1); */
`

// const ConnectedVideo = ({video}) => {
// 	const myRef:any = useRef<HTMLVideoElement>()

// 	useEffect(() => {
// 		const el = myRef.current
// 		let tmpEl = undefined;
// 		if(video?.containers && video?.containers?.length > 0) {
// 			tmpEl = video.containers[0]
// 			if(tmpEl) video?.detach(tmpEl)
// 		}
//     if(video?.containers?.length === 0) video.attach(el)
//     return (() => {
//       video?.detach(el)
// 			if(tmpEl) video?.attach(tmpEl)
//     })

// 	}, [video])

// 	return (
// 			<Video autoPlay={true} ref={myRef} id="stage_video"></Video>
// 	)
// }

const ConnectedAudio = ({audio, volume}) => {

	const myRef:any = useRef()

	useEffect(() => {
		if(myRef.current && myRef.current.volume) myRef.current.volume = volume
	},[volume])

	useEffect(() => {
		const currentEl = myRef.current
		let tmpEl = undefined
		if(audio?.containers && audio?.containers.length > 0) {
			tmpEl = audio.containers[0]
			audio.detach(tmpEl)
		}
		if(audio?.containers.length === 0) audio?.attach(currentEl)
		return(() => {
			audio?.detach(currentEl)
			if(tmpEl) audio?.attach(tmpEl)
		})
	})

	return <audio autoPlay={true} ref={myRef} className={`remoteTrack stageTrack`}/>
}

const LocalUser = () => {
	const localVideo = useLocalStore(store => store.video)
	const localAudio = useLocalStore(store => store.audio)
	return <User video={localVideo} audio={localAudio} />
}

export const User = ({video, audio}) => {
	
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
			<ConnectedAudio audio={audio} volume={1} />
			<Video autoPlay={true} ref={myRef} id="stage_video"></Video>
		</Container>
	)
}

// export const StageUser = ({video}) => {
// 	const myRef:any = useRef<HTMLVideoElement>()

// 	console.log("USER ", video)
// 	useEffect(() => {
// 		const el = myRef.current
// 		// console.log("ELEMEMNT ", el)
// 		video?.attach(el)

// 		return(() => {
// 			video?.detach(el)
// 		})
// 	},[video])

// 	return (
// 		<Container id="PETER">
// 			<Video autoPlay={true} ref={myRef} id="stage_video"></Video>
// 		</Container>
// 	)

// }

export default LocalUser