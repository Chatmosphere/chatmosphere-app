import { useEffect } from "react";
import { useConferenceStore } from "../../../store/ConferenceStore";
import { useConnectionStore } from "../../../store/ConnectionStore"
import { Button } from "../../common/Buttons/Button"

const toggleScreenshare = (meet) => {
	meet.createLocalTracks({ devices: [ 'desktop' ] }, true)
	.then((tracks, meet) => testTrack(tracks, meet))
	.catch(error => {
		console.log(error)
	});
}

const testTrack = (tracks, meet) => {
	console.clear()
	console.log("Trackobject", tracks[0])
	// that works nicely !!
	tracks[0].addEventListener(
		// @ts-ignore
		JitsiMeetJS?.events.track.LOCAL_TRACK_STOPPED,
		() => console.log("LOCAL_TRACK_STOPPED", tracks)
	);
	tracks[0].track.onended = () => console.log("Track onended") //chrome and firefox getting that event (Safari is not :(
	tracks[0].track.onmute = () => console.log("Track onmuted") //Safari Event
	}

export const ScreenshareButton = () => {
	let jsMeet = useConnectionStore(state => state.jsMeet)
	let conferenceObject = useConferenceStore(state => state.conferenceObject)

	useEffect(() => {
		//@ts-ignore()
		// const api = new window.JitsiMeetExternalAPI(domain, options);
		if(conferenceObject && jsMeet) {
			console.log("conferenceObject", conferenceObject)
			//@ts-ignore()
			conferenceObject.on(jsMeet.events.conference._MEDIA_SESSION_STARTED, () => console.log("Media Session Started"))
			//@ts-ignore()
			conferenceObject.on(jsMeet.errors.track.SCREENSHARING_GENERIC_ERROR, () => console.log("Error Generic"))
			// conferenceObject.on(jsMeet.errors.track.SCREENSHARING_USER_CANCELED, () => console.log("Error Generic"))
		}
	},[conferenceObject, jsMeet])

	return <Button onClick={() => toggleScreenshare(jsMeet)}>Screenshare</Button>
}