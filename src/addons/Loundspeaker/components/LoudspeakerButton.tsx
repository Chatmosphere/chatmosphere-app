import React, { useEffect } from 'react';
import { Button } from '../../../components/common/Buttons/Button';
import { useConferenceStore } from '../../../store/ConferenceStore';
import { useLocalStore } from '../../../store/LocalStore';

export const LoudspeakerButton = () => {

	const conference = useConferenceStore(store => store.conferenceObject)
	const isMegaphoneActive = useLocalStore(store => store.megaphone)
	const toggleMegaphone = useLocalStore(store => store.toggleMegaphone)

	useEffect(() => {
		conference?.setLocalParticipantProperty('megaphone', isMegaphoneActive ? "true" : "false");
	},[conference, isMegaphoneActive])

	return (
		<Button onMouseDown={()=>toggleMegaphone(true)} onMouseUp={()=>toggleMegaphone(false)} >Loud</Button>
	)
}