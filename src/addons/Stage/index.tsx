import { useEffect } from "react"
import styled from "styled-components"
import { useConferenceStore } from "../../store/ConferenceStore"
import { useConnectionStore } from "../../store/ConnectionStore"
import { useLocalStore } from "../../store/LocalStore"
import LocalUser from "./components/User"
import { StageUsers } from "./components/StageUsers"


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


//TODO cleaner way would be to handle the whole stage management here and refactor calculateUsersOnScreen
// Actually that would be much better - no need to loop all users in localstore on each user movement to recalculate who is on stage
// in set last-n we would just set calculated visible user array and stage user array that is set here only on participantpropertychange
// const onParticipantPropertyChange = (e) => {
// 	useLocalStore.getState().calculateUsersOnScreen()
// }

const userOnScreenSelector = store => store.calculateUsersOnScreen

const Stage = () => {

	// const stageVisible = useLocalStore(useCallback(store => store.stageVisible,[]))
	const onStage = useLocalStore(store => store.onStage)
	const conference = useConferenceStore(store => store.conferenceObject)
	const JSMeet = useConnectionStore(store => store.jsMeet)
	const calculateUsersOnScreen = useLocalStore(userOnScreenSelector)

	useEffect(() => {
		conference?.on(JSMeet?.events.conference.PARTICIPANT_PROPERTY_CHANGED, calculateUsersOnScreen)

		return (() => {
			conference?.off(JSMeet?.events.conference.PARTICIPANT_PROPERTY_CHANGED, calculateUsersOnScreen)
		})
	},[conference, JSMeet, calculateUsersOnScreen])

	return (
		<Container>
			{onStage && <LocalUser />}
			<StageUsers />
		</Container>
	)

}


export default Stage