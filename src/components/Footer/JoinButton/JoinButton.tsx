import * as React from 'react'
import { useConferenceStore } from '../../../store/ConferenceStore'
import { useConnectionStore } from '../../../store/ConnectionStore'
import { useHistory } from 'react-router-dom'
import { Button } from '../../common/Buttons/Button'
import { FaPhone } from 'react-icons/fa'
import { MdCallEnd } from 'react-icons/md'

export const JoinButton = ({ joined = false }) => {
	const leave = useConferenceStore((store) => store.leaveConference)
	const disconnectServer = useConnectionStore((store) => store.disconnectServer)
	const conferenceName = useConferenceStore((store) => store.conferenceName)
	const history = useHistory()

	const onEndCall = () => {
		leave()
		disconnectServer()
		history.push(`/`)
	}

	const onStartCall = (e) => {
		e.preventDefault()
		//perhaps it is better to create a connection and then forward to "session/" page?
		history.push(`/session/${conferenceName}`)
	}

	if (joined) {
		return (
			<Button type="danger" onClick={onEndCall}>
				<MdCallEnd />
				Leave Call
			</Button>
		)
	} else {
		return (
			<Button type="primary" onClick={onStartCall}>
				<FaPhone />
				Join
			</Button>
		)
	}
}
