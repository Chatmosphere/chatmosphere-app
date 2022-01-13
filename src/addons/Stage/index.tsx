import { useCallback, useEffect, useState} from 'react';
import { useConferenceStore } from '../../store/ConferenceStore';
import { useConnectionStore } from '../../store/ConnectionStore';
import { useLocalStore } from '../../store/LocalStore';
import User, { StageUser } from './components/User';



const userSelector = store => store.users

const Stage = () => {
	
	const stageVisible = useLocalStore(useCallback(store => store.stageVisible,[]))
	const onStage = useLocalStore(store => store.onStage)
	const conference = useConferenceStore(store => store.conferenceObject)
	const JSMeet = useConnectionStore(store => store.jsMeet)

	useEffect(() => {
		conference?.on(JSMeet?.events.conference.PARTICIPANT_PROPERTY_CHANGED, () => null)

		return (() => {
			conference?.off(JSMeet?.events.conference.PARTICIPANT_PROPERTY_CHANGED, () => null)
		})
	},[conference, JSMeet])

	return (
		<>
			{onStage && <User />}
			<StageUsers />
		</>
	)

}


const StageUsers = () => {
	const users:IUsers = useConferenceStore(userSelector)
	
	return (
		<>
		{Object.entries(users).map(user => {
			//@ts-ignore
			if(user[1]?.properties?.onStage) {
				console.log("rerender")
				return <StageUser key={user[0]} video={user[1].video} />
			}
			return null
		})}
		</>
	)
}


export default Stage