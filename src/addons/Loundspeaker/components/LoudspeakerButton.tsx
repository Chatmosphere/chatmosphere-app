import React, { useEffect } from 'react';
import useSound from 'use-sound';
import { Button } from '../../../components/common/Buttons/Button';
import { useConferenceStore } from '../../../store/ConferenceStore';
import { useLocalStore } from '../../../store/LocalStore';
import micTapSfx from './../../../assets/sounds/micTap.mp3';

export const LoudspeakerButton = () => {

	const conference = useConferenceStore(store => store.conferenceObject)
	const isMegaphoneActive = useLocalStore(store => store.megaphone)
	const toggleMegaphone = useLocalStore(store => store.toggleMegaphone)
	const [playSFX] = useSound(micTapSfx)

	useEffect(() => {
		conference?.setLocalParticipantProperty('megaphone', isMegaphoneActive ? "true" : "false");
		if(isMegaphoneActive) playSFX()
	},[conference, isMegaphoneActive, playSFX])

	return (
		<Button onMouseDown={()=>toggleMegaphone(true)} onMouseUp={()=>toggleMegaphone(false)} >Loud</Button>
	)
}