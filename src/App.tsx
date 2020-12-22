import * as React from 'react'
import './App.css'
import JitsiConnection from './components/JitsiConnection/JitsiConnection'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { Localuser } from './components/Localuser/Localuser'

import { LocalStoreLogic } from './Store/LocalStore'
import { Users } from './components/User/Users'
import { Info } from './components/common/Info/Info'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Welcome } from './screens/Home/Home'
import { Enter } from './screens/Enter/Enter'

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/enter">
					<Enter />
				</Route>

				<Route path="/session/:id">
					<div className="App">
						<Info>
							Welcome to our Prototype<br />
							Please use <b>Safari</b> or <b>Chrome</b> for now for a stable Experience
						</Info>
						<Header>Chatmosphere</Header>
						<JitsiConnection />
						<LocalStoreLogic />
						<Users />
						<Localuser />
						<Footer mute endCall />
					</div>
				</Route>

				<Route path="/">
					<Header>Chatmosphere</Header>
					<Welcome />
				</Route>
			</Switch>
		</Router>
	)
}

export default App