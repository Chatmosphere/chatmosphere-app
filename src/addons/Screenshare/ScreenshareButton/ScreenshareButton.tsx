import { useConferenceStore } from "../../../store/ConferenceStore";
import { useConnectionStore } from "../../../store/ConnectionStore"
import { useLocalStore } from "../../../store/LocalStore"
import { Button, IconButton } from "../../../components/common/Buttons/Button"
import { useCallback, useState } from "react";
import ScreenShareIcon from "../../../assets/icons/ScreenShare";




// TODO Error when alone in call - not sure why - replaceTrack has some empty object
export const ScreenshareButton = (props) => {
	const jsMeet = useConnectionStore(state => state.jsMeet)
	const setLocalTracks = useLocalStore(useCallback(store => store.setLocalTracks,[]))
	const conferenceObject = useConferenceStore(state => state.conferenceObject)
	const [isSharing, setIsSharing] = useState(false)


	const setTracks = (tracks) => {
		const newTrack = tracks[0]
		if(newTrack.videoType === 'desktop') {
			newTrack.addEventListener(
				window.JitsiMeetJS?.events.track.LOCAL_TRACK_STOPPED,() => setIsSharing(false)
			)
		}
		// tracks[0].track.onended = () => console.log("Track onended") //chrome #and firefox getting that event (Safari is not :(
		// tracks[0].track.onmute = () => console.log("Track onmuted") //Safari Event
		const oldTrack = conferenceObject?.getLocalTracks().find(track => track.getType() === "video")
		setLocalTracks(tracks)
		console.log("old videoTrack", oldTrack);
		if(oldTrack && newTrack.videoType !== oldTrack.videoType)  {
			conferenceObject?.replaceTrack(oldTrack, newTrack)
			.then(()=>{
				oldTrack.dispose()
			})
		}
	}

		const createDesktopTrack = (jsmeet) => {
			jsmeet.createLocalTracks({ devices: [ 'desktop' ] }, true) //TODO should happen in store also - just like in LocalVideo
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
		
		const onClick = () => {
		if(!jsMeet) return
		if(isSharing) {	
			createVideoTrack(jsMeet)
		} else {
			createDesktopTrack(jsMeet)
		}
		setIsSharing(!isSharing)
	}

	return <IconButton onClick={onClick} IconStart={<ScreenShareIcon />}>Screenshare</IconButton>
}

