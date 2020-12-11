import * as React from 'react';
import './App.css';
import JitsiConnection from './components/JitsiConnection/JitsiConnection';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Localuser } from './components/Localuser/Localuser';
import { LocalStoreLogic } from './components/Store/LocalStore';
import { Users } from './components/User/Users';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Welcome } from './screens/Home/Home';

function App() {
	return (
		<Router>
			<Switch>
				<Route path="/enter">
					<Header>Chatmosphere</Header>
					<Localuser />
				</Route>

        <Route path="/session/:id">
					<div className="App">
						<Header>Chatmosphere</Header>
						<JitsiConnection />
						<LocalStoreLogic />
						<Users />
						<Localuser />
						<Footer />
					</div>
        </Route>

				<Route path="/">
					<Header>Chatmosphere</Header>
					<Welcome />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
