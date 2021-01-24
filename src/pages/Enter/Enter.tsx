import * as React from 'react'
import { Header } from '../../components/Header/Header'
import { LocalStoreLogic } from '../../store/LocalStoreLogic'
import { Room } from '../../components/Room/Room'
import { ReactComponent as Wave } from './../../assets/wave.svg'

import { Footer } from '../../components/Footer/Footer'
import { PanWrapper } from '../../components/PanWrapper/PanWrapper'
import { UserDragContainer } from '../../components/Localuser/LocalUserContainer'
import { Localuser } from '../../components/Localuser/Localuser'
import { JoinButton } from '../../components/Footer/JoinButton/JoinButton'
import { MuteButton } from '../../components/Footer/MuteButton/MuteButton'

import { useParams } from 'react-router-dom'
import { useConferenceStore } from '../../store/ConferenceStore'
import styled from 'styled-components'
import { BigHeadline } from '../../components/common/BigHeadline'
import { SubHeadline } from '../../components/common/SubHeadline'
import { VideoButton } from '../../components/Footer/VideoButton/VideoButton'

const BigHeadContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`

const CenterContainer = styled.div`
	position: fixed;
  top: 200px;
  width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
  z-index: 1;
`

export const Enter = () => {
	const { id } = useParams() //get Id from url, should error check here I guess
	const setConferenceName = useConferenceStore(store => store.setConferenceName)

	React.useEffect(
		() => {
			setConferenceName(id)
		},
		[ id ],
	)

	return (
		<React.Fragment>
			<LocalStoreLogic />
			<PanWrapper>
				<Room>
					<UserDragContainer>
						<Localuser />
					</UserDragContainer>
				</Room>
			</PanWrapper>
			<CenterContainer id="centerContainer">
				<BigHeadContainer>
					<Wave />
					<BigHeadline>Welcome to Chatmosphere</BigHeadline>
				</BigHeadContainer>
				<SubHeadline>The Open Source Videochat for Cozy Talks</SubHeadline>
			</CenterContainer>
			<Footer>
				<MuteButton />
				<JoinButton />
				<VideoButton />
			</Footer>
		</React.Fragment>
	)
}
