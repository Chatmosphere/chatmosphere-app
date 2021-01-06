import * as React from 'react'
import JitsiConnection from './components/JitsiConnection/JitsiConnection'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { Localuser } from './components/Localuser/Localuser'

import { LocalStoreLogic } from './Store/LocalStoreLogic'
import { Users } from './components/User/Users'
import { Info } from './components/common/Info/Info'
import { Room } from './components/Room/Room'
import { PanHandler } from './components/PanHandler/PanHandler'
import styled from 'styled-components'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Welcome } from './screens/Home/Home'
import { Enter } from './screens/Enter/Enter'


const AppContainer = styled.div`
	text-align: center;
	position: fixed;
  width: 100%;
  height: 100%;
  cursor: default;
`

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/enter">
					<Enter />
				</Route>

				<Route path="/session/:id">
					{/* TODO: redirect to "/enter" if this the first time the user in this conference */}
					<AppContainer id="App">
			<Info>
				Welcome to our Prototype
				<br />
				Please use <b>Safari</b> or <b>Chrome</b> for now for a stable Experience
			</Info>
			<Header>Chatmosphere</Header>
			<JitsiConnection />
			<LocalStoreLogic />
			<PanHandler>
				<Room>
					<Users />
					<Localuser />
				</Room>
			</PanHandler>
			<Footer />
		</AppContainer>
				</Route>

				<Route path="/">
					<Header>Chatmosphere</Header>
					<Welcome />
				</Route>
			</Switch>
		</Router>
	)
}
