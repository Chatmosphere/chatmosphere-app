import * as React from 'react'
import { useConferenceStore } from '../../../store/ConferenceStore'
import { useConnectionStore } from '../../../store/ConnectionStore'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../common/Buttons/Button'
import { PhoneOff } from 'react-feather'

export const JoinButton = ({ joined = false }) => {
	const leave = useConferenceStore((store) => store.leaveConference)
	const disconnectServer = useConnectionStore((store) => store.disconnectServer)
	const conferenceName = useConferenceStore((store) => store.conferenceName)
	const navigate = useNavigate()

	const onEndCall = () => {
		leave()
		disconnectServer()
		navigate(`/`)
	}

	const onStartCall = (e) => {
		e.preventDefault()
		//perhaps it is better to create a connection and then forward to "session/" page?
		navigate(`/session/${conferenceName}`)
	}

	if (joined) {
		return (
			<Button warning round onClick={onEndCall} label="Leave Call" />
		)
	} else {
		return (
			<Button primary round onClick={onStartCall} label="Join" IconStart={	<PhoneOff />} />
		)
	}
}
