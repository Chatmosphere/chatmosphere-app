import * as React from 'react'
import './App.css'
import JitsiConnection from './components/JitsiConnection/JitsiConnection'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { Localuser } from './components/Localuser/Localuser'
import { LocalStoreLogic } from './Store/LocalStoreLogic'
import { Users } from './components/User/Users'
import { Info } from './components/common/Info/Info'
import { Room } from './components/Room/Room'
import { PanHandler } from './components/PanHandler/PanHandler'

console.log("PROCESS IS ", process.env.REACT_APP_SERVER_OPTION)

function App() {
	return (
		<div className="App">
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
		</div>
	)
}

export default App
