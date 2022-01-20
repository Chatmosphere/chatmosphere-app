import { useEffect} from 'react';
import styled from 'styled-components';
import { useConferenceStore } from '../../store/ConferenceStore';
import { useConnectionStore } from '../../store/ConnectionStore';
import { useLocalStore } from '../../store/LocalStore';
import LocalUser, { User } from './components/User';


const Container = styled.div`
	position: absolute;
	display: flex;
	flex-direction: row;
	gap: 20px;
	width: auto;
	height: 300px;
	background-color: white;
	top: 30px;
	left: 30px;
`


const userSelector = store => store.users

const Stage = () => {
	
	// const stageVisible = useLocalStore(useCallback(store => store.stageVisible,[]))
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
		<Container>
			{onStage && <LocalUser />}
			<StageUsers />
		</Container>
	)

}


const StageUsers = () => {
	const users:IUsers = useConferenceStore(userSelector)
	
	return (
		<>
		{Object.entries(users).map(user => {
			if(user[1]?.properties?.onStage) {
				// console.log("rerender")
				/**
					TODO this is rerendering on every move, even though react will diff it out, Im not sure thats cool;
				 	we only need updates if properties change so we could have a stageusers array instead;
				  -> could also have a "users Visible" array to only render them on stage at all
				 */
				//@ts-ignore
				return <User key={user[0]} audio={user[1].audio} video={user[1].video} />
			}
			return null
		})}
		</>
	)
}


export default Stage