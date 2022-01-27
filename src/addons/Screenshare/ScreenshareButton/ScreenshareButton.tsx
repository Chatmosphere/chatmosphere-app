// @ts-nocheck
import { useConferenceStore } from "../../../store/ConferenceStore";
import { useConnectionStore } from "../../../store/ConnectionStore"
import { useLocalStore } from "../../../store/LocalStore"
import { Button } from "../../../components/common/Buttons/Button"
import { useCallback, useEffect, useState } from "react";


// 	}

	// TODO Error when alone in call - not sure why - replaceTrack has some empty object
export const ScreenshareButton = () => {
	const jsMeet = useConnectionStore(state => state.jsMeet)
	const connection = useConnectionStore(state => state.connection)
	const setLocalTracks = useLocalStore(useCallback(store => store.setLocalTracks,[]))
	const conferenceObject = useConferenceStore(state => state.conferenceObject)
	const [isSharing, setIsSharing] = useState(false)


	useEffect(() => {


		const setTracks = (tracks) => {
			const track = tracks[0]
			track.addEventListener(
				window.JitsiMeetJS?.events.track.LOCAL_TRACK_STOPPED,() => console.log("LOCAL_TRACK_STOPPED", tracks)
			)
			// tracks[0].track.onended = () => console.log("Track onended") //chrome #and firefox getting that event (Safari is not :(
			// tracks[0].track.onmute = () => console.log("Track onmuted") //Safari Event
			const videoTrack = conferenceObject?.getLocalTracks().find(track => track.getType() === "video")
			setLocalTracks(tracks)
			console.log("videoTrack", videoTrack);
			if(track.videoType !== videoTrack.videoType) conferenceObject?.replaceTrack(videoTrack, track)
		}

		const createDesktopTrack = (jsmeet) => {
			jsmeet.createLocalTracks({ devices: [ 'desktop' ] }, true)
			.then((tracks) => setTracks(tracks))
			.catch(error => {
				console.log(error)
			});
		}
		const createVideoTrack = (jsmeet) => {
			jsmeet.createLocalTracks({ devices: [ 'video' ] }, true)
			.then((tracks) => setTracks(tracks))
			.catch(error => {
				console.log(error)
			});
		}

		if(jsMeet && conferenceObject) {
			if(isSharing) {
				createDesktopTrack(jsMeet)
			} else {
				createVideoTrack(jsMeet)
			}
		}
	},[isSharing, jsMeet, conferenceObject, setLocalTracks])

	

	// const toggleScreenshare = (meet) => {
	// 	if(!meet) return

	// 	meet.createLocalTracks({ devices: [ 'desktop' ] }, true)
	// 	.then((tracks) => setTracks(tracks))
	// 	.catch(error => {
	// 		console.log(error)
	// 	});
	// }

	return <Button onClick={() => setIsSharing(!isSharing)}>Screenshare</Button>
}

