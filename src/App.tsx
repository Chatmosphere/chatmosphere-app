import * as React from 'react'
import JitsiConnection from './components/JitsiConnection/JitsiConnection'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { LocalStoreLogic } from './Store/LocalStoreLogic'
import { Users } from './components/User/Users'
import { Info } from './components/common/Info/Info'
import { Room } from './components/Room/Room'
import { PanWrapper } from './components/PanWrapper/PanWrapper'
import styled from 'styled-components'
import { LocalUserContainer } from './components/Localuser/LocalUserContainer'

const AppContainer = styled.div`
	text-align: center;
	position: fixed;
  width: 100%;
  height: 100%;
  cursor: default;
`

function App() {
	return (
		<AppContainer id="App">
			<Info>
				Welcome to our Prototype
				<br />
				Please use <b>Safari</b> or <b>Chrome</b> for now for a stable Experience
			</Info>
			<Header>Chatmosphere</Header>
			<JitsiConnection />
			<LocalStoreLogic />
			<PanWrapper>
				<Room>
					<Users />
					<LocalUserContainer />
				</Room>
			</PanWrapper>
			<Footer />
		</AppContainer>
	)
}

export default App
