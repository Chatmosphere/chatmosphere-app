import React from 'react'
import styled from 'styled-components'
import { NameInputContainer } from './elements/NameInputContainer'
import { ReactComponent as Wave } from './../../assets/wave.svg'
import { Footer } from '../../components/Footer/Footer'

const BigHead = styled.h1`
	font-size: 2.5rem;
	color: ${(props) => props.theme.colors.primary.dark};
	margin: 0;
`
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

const SubHead = styled.h3`
	font-size: 1.25rem;
	margin:0;
	color: ${(props) => props.theme.colors.grey.dark};
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
				<BigHead>Welcome to Chatmosphere</BigHead>
			</BigHeadContainer>
			<SubHead>The Open Source Videochat for Cozy Talks</SubHead>
			<FormContainer>
				<NameInputContainer />
			</FormContainer>
			</CenterContainer>
			<Footer />
		</React.Fragment>
	)
}
