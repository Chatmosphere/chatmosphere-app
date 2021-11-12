import React, { useEffect, useState } from 'react';
import { Button } from '../../../components/common/Buttons/Button';
import { useConferenceStore } from '../../../store/ConferenceStore';

export const LoudspeakerButton = () => {

	const conference = useConferenceStore(store => store.conferenceObject)
	const [isMegaphoneActive, toggleMegaphone] = useState(false);

	useEffect(() => {
		conference?.setLocalParticipantProperty('megaphone', isMegaphoneActive ? "true" : "false");
	},[conference, isMegaphoneActive])

	return (
		<Button onMouseDown={()=>toggleMegaphone(true)} onMouseUp={()=>toggleMegaphone(false)} >Loud</Button>
	)
}