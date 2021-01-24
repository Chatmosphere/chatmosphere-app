import React from 'react'
import styled from 'styled-components'
import { NameInputContainer } from './elements/NameInputContainer'
import { ReactComponent as Wave } from './../../assets/wave.svg'
import { Footer } from '../../components/Footer/Footer'
import {BigHeadline} from './../../components/common/BigHeadline'
import { SubHeadline } from '../../components/common/SubHeadline'

const BigHeadContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`

const CenterContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 100%;
`

const FormContainer = styled.div`
	margin-top: 40px;
`

export const Home = () => {
	return (
		<React.Fragment>
			<CenterContainer>
			<BigHeadContainer>
				<Wave />
				<BigHeadline>Welcome to Chatmosphere</BigHeadline>
			</BigHeadContainer>
			<SubHeadline>The Open Source Videochat for Cozy Talks</SubHeadline>
			<FormContainer>
				<NameInputContainer />
			</FormContainer>
			</CenterContainer>
			<Footer />
		</React.Fragment>
	)
}
